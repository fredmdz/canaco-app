// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import duration from 'dayjs/plugin/duration';

// Extiende dayjs con los plugins necesarios ANTES de cualquier uso de dayjs
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

// Importa tus servicios de Firebase y autenticación
// ¡¡IMPORTANTE!! Asegúrate de que esta ruta sea CORRECTA
// Si tu carpeta 'services' está en la misma raíz que 'context', esta ruta es correcta:
import { servicesFirebase, servicesUsers, auth } from '../services'; 

export const UserContext = createContext(null);

// Colores de alerta (pueden ser globales o definidos aquí)
const DANGER_RED = '#DC3545';
const WARNING_YELLOW = '#FFC107';

const getAffiliationStatus = (expirationDate) => {
    if (!expirationDate) {
        return { text: "No disponible", color: '#000000', status: "unknown", icon: null };
    }

    const today = dayjs();
    const expiry = dayjs(expirationDate);

    if (expiry.isSameOrBefore(today, 'day')) {
        return { text: "Caducado: ", color: DANGER_RED, status: "expired", icon: 'alert-circle' };
    }

    const daysUntilExpiry = expiry.diff(today, 'day');

    if (daysUntilExpiry <= 90) { 
        return { text: "Vigente hasta: ", color: WARNING_YELLOW, status: "near_expiry", icon: 'information-outline' };
    }

    return { text: "Vigente hasta: ", color: '#000000', status: "active", icon: null }; // Color por defecto (negro o gris oscuro)
};

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const fetchUserData = async () => {
        try {
            setLoadingUser(true);
            const currentUser = auth?.currentUser;

            if (!currentUser) {
                setUserData(null);
                setLoadingUser(false);
                return;
            }

            const userId = currentUser.uid;
            const userEmail = currentUser.email;

            const userDataFromDb = await servicesFirebase.getOne("usuarios", userId);

            if (!userDataFromDb) {
                console.warn("No user data found in 'usuarios' collection for UID:", userId);
                setUserData(null);
                setLoadingUser(false);
                return;
            }

            const affiliatesData = await servicesFirebase.getAll("afiliados");
            let isUserAffiliate = false;
            let affiliateDetails = null;

            if (userEmail && affiliatesData && affiliatesData.length > 0) {
                const matchingAffiliate = affiliatesData.find(
                    (affiliate) => affiliate.correo === userEmail && affiliate.estado === "aceptado"
                );
                if (matchingAffiliate) {
                    isUserAffiliate = true;
                    affiliateDetails = matchingAffiliate;
                }
            }

            let updatedUserData = { ...userDataFromDb };
            
            if (isUserAffiliate && affiliateDetails) {
                let calculatedFechaVencimiento = null;
                if (affiliateDetails.fechaInicio) {
                    let fechaInicioDate = null;
                    if (typeof affiliateDetails.fechaInicio.toDate === 'function') {
                        fechaInicioDate = affiliateDetails.fechaInicio.toDate();
                    } else if (affiliateDetails.fechaInicio instanceof Date) {
                        // Si ya es un objeto Date
                        fechaInicioDate = affiliateDetails.fechaInicio;
                    } else {
                        try {
                            fechaInicioDate = dayjs(affiliateDetails.fechaInicio).toDate();
                        } catch (parseError) {
                            console.warn("Could not parse fechaInicio into a Date (start date):", affiliateDetails.fechaInicio, parseError);
                        }
                    }

                    // Si se pudo obtener una fecha de inicio válida, calcular la fecha de vencimiento (+1 año)
                    if (fechaInicioDate) {
                        calculatedFechaVencimiento = dayjs(fechaInicioDate).add(1, 'year').toDate();
                    }
                }
                updatedUserData.fechaVencimiento = calculatedFechaVencimiento;
            } else {
                 // Si no es afiliado o no hay detalles de afiliado, no hay fecha de vencimiento
                 updatedUserData.fechaVencimiento = null;
            }

            // 4. Determinar el estado de visualización de la afiliación
            const affiliationStatus = getAffiliationStatus(updatedUserData.fechaVencimiento);

            // 5. Establecer los datos del usuario en el estado del contexto
            setUserData({
                ...updatedUserData,
                isAffiliate: isUserAffiliate, 
                affiliationStatusDisplay: affiliationStatus, 
            });

        } catch (err) {
            console.error("Error fetching user data in UserProvider:", err);
            setUserData(null); 
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Usuario autenticado, intentar cargar sus datos
                fetchUserData();
            } else {
                // Usuario no autenticado, limpiar datos
                setUserData(null);
                setLoadingUser(false);
            }
        });
        return unsubscribe;
    }, []); // El array vacío asegura que se ejecute solo una vez al montar

    return (
        <UserContext.Provider value={{ userData, loadingUser, refreshUserData: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};