import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Image, Alert, ActivityIndicator, TouchableOpacity, Modal, Dimensions, ScrollView, RefreshControl, Platform } from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import duration from 'dayjs/plugin/duration';
import { useNavigation } from "@react-navigation/native";
import QRCode from 'react-native-qrcode-svg';
import { servicesFirebase, servicesUsers, auth } from "../../services";

dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

const { width, height } = Dimensions.get('window');

const BRAND_PRIMARY = '#314c95';
const DANGER_RED = '#F44336';
const WARNING_YELLOW = '#FFC107';
const ACCENT_GREEN = '#4CAF50';
const BACKGROUND_LIGHT = '#F5F7FA';
const CARD_BACKGROUND = '#FFFFFF';
const TEXT_PRIMARY = '#263238';
const TEXT_SECONDARY = '#757575';
const BORDER_COLOR = '#E0E0E0';

const LOGO_ASSET = require("../../assets/login/logo1.png");


export default function VerOpciones() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    // const [showQrCode, setShowQrCode] = useState(false);
    const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);
            const currentUser = auth?.currentUser;
            if (!currentUser) throw new Error("No hay usuario autenticado");
            const userId = currentUser.uid;
            const userEmail = currentUser.email;

            const userDataFromDb = await servicesFirebase.getOne("usuarios", userId);
            const affiliatesData = await servicesFirebase.getAll("afiliados");

            let isUserAffiliate = false;
            let affiliateDetails = null;
            if (userEmail && affiliatesData && affiliatesData.length > 0) {
                affiliateDetails = affiliatesData.find(
                    (affiliate) => affiliate.correo === userEmail && affiliate.estado === "aceptado"
                );
                isUserAffiliate = !!affiliateDetails;
            }

            let finalUserData = {
                ...userDataFromDb,
                isAffiliate: isUserAffiliate,
                profilePictureUrl: userDataFromDb?.images || null,
                fechaVencimiento: null,
            };

            let shouldUpdateUserInDb = false;

            if (isUserAffiliate) {
                finalUserData = {
                    ...finalUserData,
                    nombre: affiliateDetails.nombre || finalUserData.nombre,
                    apellidos: affiliateDetails.apellidos || finalUserData.apellidos,
                    empresa: { nombre: affiliateDetails.empresa || finalUserData.empresa?.nombre },
                    telefono: affiliateDetails.telefono || finalUserData.telefono,
                    direccion: affiliateDetails.direccion || finalUserData.direccion,
                    profilePictureUrl: affiliateDetails.images || finalUserData.profilePictureUrl,
                    role: "afiliado",
                    fechaVencimiento: affiliateDetails.fechaInicio ? dayjs(affiliateDetails.fechaInicio?.toDate?.() || affiliateDetails.fechaInicio).add(1, 'year').toDate() : null,
                };

                if (userDataFromDb?.role !== "afiliado") {
                    shouldUpdateUserInDb = true;
                }
            } else {
                finalUserData = {
                    ...finalUserData,
                    nombre: userDataFromDb?.nombre || '',
                    apellidos: userDataFromDb?.apellidos || '',
                    role: "publico",
                };

                if (userDataFromDb?.role !== "publico") {
                    shouldUpdateUserInDb = true;
                }
            }

            if (shouldUpdateUserInDb) {
                await servicesFirebase.edit("usuarios", userId, { role: finalUserData.role });
            }

            finalUserData.profilePictureUrl = (typeof finalUserData.profilePictureUrl === 'string' && finalUserData.profilePictureUrl !== '')
                ? finalUserData.profilePictureUrl
                : LOGO_ASSET;

            setUserData(finalUserData);
        } catch (err) {
            console.error("Error al cargar datos del perfil:", err);
            setError(err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUserData();
    }, []);

    const openImageViewer = () => {
        if (userData?.profilePictureUrl && typeof userData.profilePictureUrl === 'string' && userData.profilePictureUrl !== LOGO_ASSET) {
            setIsImageViewerVisible(true);
        } else {
            Alert.alert("Imagen no disponible", "No hay una imagen de perfil cargada para mostrar.");
        }
    };

    const getAffiliationStatus = (expirationDate) => {
        if (!expirationDate) return { text: "No aplica", color: TEXT_SECONDARY, status: "unknown", icon: 'information-outline' };

        const today = dayjs();
        const expiry = dayjs(expirationDate);

        if (expiry.isSameOrBefore(today, 'day')) {
            return { text: "Caducado", color: DANGER_RED, status: "expired", icon: 'close-circle' };
        }

        const daysUntilExpiry = expiry.diff(today, 'day');
        if (daysUntilExpiry <= 90) {
            return { text: "Próximo a Vencer", color: WARNING_YELLOW, status: "near_expiry", icon: 'alert-circle' };
        }

        return { text: "Vigente", color: ACCENT_GREEN, status: "active", icon: 'check-circle' };
    };

    const generateVCard = useCallback(() => {
        if (!userData) return '';
        const { nombre, apellidos, correo, telefono, empresa, isAffiliate, fechaVencimiento } = userData;

        let displayName = isAffiliate
            ? nombre || 'Afiliado'
            : `${nombre || ''} ${apellidos || ''}`.trim();

        let vCard = 'BEGIN:VCARD\nVERSION:3.0\n';
        vCard += `FN;CHARSET=UTF-8:${displayName}\n`;
        if (empresa?.nombre) vCard += `ORG;CHARSET=UTF-8:${empresa.nombre}\n`;
        if (telefono) vCard += `TEL:${telefono}\n`;
        if (correo) vCard += `EMAIL:${correo}\n`;
        if (isAffiliate) {
            vCard += `X-ROLE;CHARSET=UTF-8:Afiliado CANACO SERVYTUR\n`;
            if (fechaVencimiento) {
                const date = fechaVencimiento instanceof Date ? fechaVencimiento : new Date(fechaVencimiento);
                vCard += `X-AFILIACION-VENCE:${dayjs(date).format('YYYY-MM-DD')}\n`;
            }
        }
        vCard += 'END:VCARD';
        return vCard;
    }, [userData]);

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas cerrar tu sesión?",
            [{ text: "Cancelar", style: "cancel" }, { text: "Sí, cerrar", onPress: async () => { try { await servicesUsers.logout(); } catch (err) { Alert.alert("Error", "No se pudo cerrar la sesión"); } } }]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Eliminar cuenta",
            "Esta acción eliminará permanentemente tu cuenta y todos tus datos",
            [{ text: "Cancelar", style: "cancel" }, { text: "Continuar", onPress: () => confirmAccountDeletion() }]
        );
    };

    const confirmAccountDeletion = () => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás completamente seguro? Esta acción no se puede deshacer",
            [{ text: "Cancelar", style: "cancel" }, {
                text: "Eliminar definitivamente",
                onPress: async () => {
                    try {
                        setDeleting(true);
                        const userId = auth?.currentUser?.uid;
                        if (!userId) throw new Error("Usuario no identificado");
                        await servicesFirebase.delete("usuarios", userId);
                        const user = auth.currentUser;
                        await user.delete();
                        Alert.alert(
                            "Cuenta eliminada",
                            "Tu cuenta ha sido eliminada exitosamente",
                            [{ text: "OK", onPress: () => servicesUsers.logout() }]
                        );
                    } catch (err) {
                        console.error("Error al eliminar cuenta:", err);
                        let errorMessage = err.message || "No se pudo eliminar la cuenta";
                        if (err.code === 'auth/requires-recent-login') {
                            errorMessage = "Por seguridad, debes iniciar sesión nuevamente para eliminar tu cuenta.";
                        }
                        Alert.alert("Error", errorMessage);
                    } finally {
                        setDeleting(false);
                    }
                }
            }]
        );
    };

    if (loading || deleting) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={BRAND_PRIMARY} />
                {deleting && <Text style={styles.loadingText}>Eliminando cuenta...</Text>}
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button mode="contained" onPress={fetchUserData} style={styles.retryButton} buttonColor={BRAND_PRIMARY}>
                    Reintentar
                </Button>
            </View>
        );
    }

    const affiliationStatusDisplay = userData?.isAffiliate && userData?.fechaVencimiento
        ? getAffiliationStatus(userData.fechaVencimiento)
        : { text: "Público General", color: TEXT_SECONDARY, status: "unknown", icon: 'account-circle-outline' };

    const mainStatusText = userData?.isAffiliate ? `Afiliado (${affiliationStatusDisplay.text})` : "Público General";
    const formattedDate = userData?.fechaVencimiento ? dayjs(userData.fechaVencimiento).format('DD/MM/YYYY') : "N/A";
    const userRole = userData?.isAffiliate ? (userData?.empresa?.nombre || 'Afiliado CANACO SERVYTUR') : 'Miembro de CANACO SERVYTUR';

    const fullName = userData?.isAffiliate
        ? userData?.nombre || 'Afiliado'
        : `${userData?.nombre || ''} ${userData?.apellidos || ''}`.trim();

    // Comentar la generación de vCard para evitar advertencias de eslint
    // const vCardString = generateVCard();

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={BRAND_PRIMARY} />
            }
        >
            <View style={styles.profileHeaderHorizontal}>
                <TouchableOpacity onPress={openImageViewer}>
                    <Image
                        style={[
                            styles.profileImage,
                            userData?.isAffiliate ? styles.profileImageAffiliate : null,
                        ]}
                        source={
                            userData?.profilePictureUrl && typeof userData.profilePictureUrl === 'string' && userData.profilePictureUrl !== ''
                                ? { uri: userData.profilePictureUrl }
                                : LOGO_ASSET
                        }
                        resizeMode={userData?.isAffiliate ? "cover" : "contain"}
                    />
                </TouchableOpacity>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{fullName || "Usuario"}</Text>
                    <Text style={styles.profileTitle}>
                        {userRole}
                    </Text>
                </View>
            </View>

            {/* Inicia la sección comentada del QR */}
            {/*
            {userData?.isAffiliate && (
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.sectionTitle}>Mi Tarjeta Digital</Text>
                        <TouchableOpacity
                            style={styles.qrOption}
                            onPress={() => setShowQrCode(!showQrCode)}
                        >
                            <View style={[styles.shareIconContainer, { backgroundColor: BRAND_PRIMARY + '10' }]}>
                                <Icon name="qrcode-scan" size={28} color={BRAND_PRIMARY} />
                            </View>
                            <View style={styles.shareTextContent}>
                                <Text style={styles.shareOptionTitle}>Código QR de Afiliado</Text>
                                <Text style={styles.shareOptionSubtitle}>Comparte tus datos de contacto al instante</Text>
                            </View>
                            <Icon name={showQrCode ? "chevron-up" : "chevron-down"} size={24} color={TEXT_SECONDARY} />
                        </TouchableOpacity>

                        {showQrCode && (
                            <View style={styles.qrCodeDisplayContainer}>
                                {userData && (
                                    <QRCode
                                        value={vCardString}
                                        size={width * 0.5}
                                        color={BRAND_PRIMARY}
                                        backgroundColor={CARD_BACKGROUND}
                                    />
                                )}
                                <Text style={styles.qrPlaceholderSubtext}>Escanea para guardar mi contacto (vCard)</Text>
                            </View>
                        )}
                    </Card.Content>
                </Card>
            )}
            */}
            {/* Fin de la sección comentada del QR */}

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.sectionTitle}>Datos Personales</Text>
                    <View style={styles.dataRow}>
                        <Icon name="email-outline" size={24} color={BRAND_PRIMARY} style={styles.dataIcon} />
                        <Text style={styles.label}>Correo:</Text>
                        <Text style={styles.value}>{userData?.correo || "No disponible"}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Icon name="phone-outline" size={24} color={BRAND_PRIMARY} style={styles.dataIcon} />
                        <Text style={styles.label}>Teléfono:</Text>
                        <Text style={styles.value}>{userData?.telefono || "No disponible"}</Text>
                    </View>
                    {userData?.empresa?.nombre && (
                        <View style={styles.dataRow}>
                            <Icon name="domain" size={24} color={BRAND_PRIMARY} style={styles.dataIcon} />
                            <Text style={styles.label}>Empresa:</Text>
                            <Text style={styles.value}>{userData?.empresa?.nombre || "No disponible"}</Text>
                        </View>
                    )}
                    <View style={styles.dataRow}>
                        <Icon name="map-marker-outline" size={24} color={BRAND_PRIMARY} style={styles.dataIcon} />
                        <Text style={styles.label}>Dirección:</Text>
                        <Text style={styles.value}>{userData?.direccion || "No disponible"}</Text>
                        </View>
                    <Divider style={styles.cardDivider} />
                    <View style={styles.dataRow}>
                        <Icon name={affiliationStatusDisplay.icon} size={24} color={affiliationStatusDisplay.color} style={styles.dataIcon} />
                        <Text style={styles.label}>Estatus:</Text>
                        <Text style={[styles.value, { color: affiliationStatusDisplay.color, fontWeight: 'bold' }]}>
                            {mainStatusText}
                        </Text>
                    </View>
                    {userData?.isAffiliate && (
                        <View style={styles.dataRow}>
                            <Icon name="calendar-check" size={24} color={BRAND_PRIMARY} style={styles.dataIcon} />
                            <Text style={styles.label}>Vigencia:</Text>
                            <Text style={[styles.value, {color: affiliationStatusDisplay.color}]}>
                                {formattedDate}
                            </Text>
                        </View>
                    )}
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.sectionTitle}>Gestión de Cuenta</Text>
                    <TouchableOpacity style={styles.actionOption} onPress={handleLogout}>
                        <View style={[styles.actionIconContainer, { backgroundColor: BRAND_PRIMARY + '10' }]}>
                            <Icon name="logout" size={28} color={BRAND_PRIMARY} />
                        </View>
                        <View style={styles.actionTextContent}>
                            <Text style={styles.actionOptionTitle}>Cerrar Sesión</Text>
                            <Text style={styles.actionOptionSubtitle}>Sal de tu cuenta actual</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider style={styles.cardDivider} />
                    <TouchableOpacity style={styles.actionOption} onPress={handleDeleteAccount}>
                        <View style={[styles.actionIconContainer, { backgroundColor: DANGER_RED + '10' }]}>
                            <Icon name="delete-forever-outline" size={28} color={DANGER_RED} />
                        </View>
                        <View style={styles.actionTextContent}>
                            <Text style={[styles.actionOptionTitle, { color: DANGER_RED }]}>Eliminar Cuenta</Text>
                            <Text style={styles.actionOptionSubtitle}>Eliminar permanentemente tu cuenta</Text>
                        </View>
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            <Modal
                visible={isImageViewerVisible}
                transparent={true}
                onRequestClose={() => setIsImageViewerVisible(false)}
            >
                <TouchableOpacity
                    style={styles.fullScreenImageContainer}
                    onPress={() => setIsImageViewerVisible(false)}
                    activeOpacity={1}
                >
                    {userData?.profilePictureUrl && (
                        <Image
                            source={{ uri: userData.profilePictureUrl }}
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                        />
                    )}
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_LIGHT,
    },
    profileHeaderHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 15,
        margin: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    profileInfo: {
        marginLeft: 15,
        flex: 1,
    },
    profileImage: {
        width: 45,
        height: 45,
    },
    profileImageAffiliate: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: BRAND_PRIMARY,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: TEXT_PRIMARY,
        marginBottom: 4,
    },
    profileTitle: {
        fontSize: 16,
        color: TEXT_SECONDARY,
    },
    card: {
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        backgroundColor: CARD_BACKGROUND,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: BRAND_PRIMARY,
        marginBottom: 15,
        textAlign: "center"
    },
    dataRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    dataIcon: {
        width: 32,
        textAlign: 'center',
        marginRight: 15,
    },
    label: {
        fontWeight: "600",
        color: TEXT_PRIMARY,
        fontSize: 16,
        flex: 1,
    },
    value: {
        color: TEXT_SECONDARY,
        fontSize: 16,
        flex: 2,
        textAlign: 'right',
    },
    qrOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    shareIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    shareTextContent: {
        flex: 1,
    },
    shareOptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_PRIMARY,
    },
    shareOptionSubtitle: {
        fontSize: 14,
        color: TEXT_SECONDARY,
    },
    qrCodeDisplayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginTop: 15,
        backgroundColor: BACKGROUND_LIGHT,
        borderRadius: 10,
    },
    qrPlaceholderSubtext: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        textAlign: 'center',
        marginTop: 10,
    },
    actionOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    actionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    actionTextContent: {
        flex: 1,
    },
    actionOptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_PRIMARY,
    },
    actionOptionSubtitle: {
        fontSize: 14,
        color: TEXT_SECONDARY,
    },
    cardDivider: {
        backgroundColor: BORDER_COLOR,
        height: 1,
        marginVertical: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_LIGHT
    },
    loadingText: {
        marginTop: 10,
        color: TEXT_PRIMARY,
        fontSize: 16
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: BACKGROUND_LIGHT
    },
    errorText: {
        color: DANGER_RED,
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16
    },
    retryButton: {
        backgroundColor: BRAND_PRIMARY
    },
    fullScreenImageContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width * 0.95,
        height: height * 0.95,
        resizeMode: 'contain',
    },
});