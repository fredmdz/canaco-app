import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, db } from '../../services/servicesFirebase';
import { servicesUsers } from '../../services/servicesUsers';
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { Background } from "../../components/ui/";

export default function VerifyEmail({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [attemptsLeft, setAttemptsLeft] = useState(3);

    useEffect(() => {
        const interval = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                await user.reload();
                if (user.emailVerified) {
                    await user.getIdToken(true);
                    clearInterval(interval);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // conteo regresivo de 60s
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleResendEmail = async () => {
        if (cooldown > 0) return;

        setLoading(true);
        try {
            const user = auth.currentUser;
            const userRef = doc(db, "usuarios", user.uid);
            const userDoc = await getDoc(userRef);
            
            const now = Date.now();
            const fiveHoursAgo = now - (5 * 60 * 60 * 1000);
            
            // Obtener historial de intentos
            const data = userDoc.data();
            const attempts = data.intentosVerificacion || [];
            
            // Filtrar intentos de las últimas 5 horas
            const recentAttempts = attempts.filter(t => t.toMillis() > fiveHoursAgo);

            if (recentAttempts.length >= 3) {
                const lastAttempt = recentAttempts[recentAttempts.length - 1].toMillis();
                const waitTime = Math.ceil((lastAttempt + (5 * 60 * 60 * 1000) - now) / (60 * 60 * 1000));
                Alert.alert("Límite alcanzado", `Has superado los 3 intentos. Por favor espera unas ${waitTime} horas para intentarlo de nuevo.`);
                setLoading(false);
                return;
            }

            // Enviar correo
            const success = await servicesUsers.sendVerification();
            if (success) {
                // Registrar intento en Firestore
                await updateDoc(userRef, {
                    intentosVerificacion: arrayUnion(Timestamp.now())
                });
                
                setCooldown(60); // 60 segundos de espera
                setAttemptsLeft(2 - recentAttempts.length);
                Alert.alert("Correo enviado", "Revisa tu bandeja de entrada y carpeta de spam.");
            } else {
                Alert.alert("Error", "No se pudo enviar el correo. Inténtalo más tarde.");
            }
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/too-many-requests') {
                Alert.alert("Demasiadas peticiones", "Demasiadas peticiones. Por favor intenta de nuevo en unos minutos.");
            } else {
                Alert.alert("Error", "Ocurrió un error al procesar tu solicitud.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await servicesUsers.logout();
    };

    return (
        <Background.Image source={require("../../assets/fondos/city2.png")} style={{ flex: 1 }}>
            <View style={styles.overlay}>
                <Card style={styles.card}>
                    <Card.Content style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Icon name="email-alert-outline" size={100} color="#E67E22" />
                        </View>
                        
                        <Text style={styles.title}>¡Verifica tu correo!</Text>
                        
                        <Text style={styles.description}>
                            Para poder continuar, necesitamos confirmar tu identidad en:{"\n"}
                            <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
                        </Text>

                        <View style={styles.infoBox}>
                            <Icon name="information-outline" size={28} color="#D35400" />
                            <Text style={styles.infoText}>
                                Busca el correo de CANACO y haz clic en el enlace para activar tu cuenta.
                            </Text>
                        </View>

                        <Text style={styles.spamNotice}>
                            💡 ¿No lo recibiste? Revisa tu carpeta de {"\n"}
                            <Text style={{fontWeight: 'bold', color: '#D35400'}}>Correo no deseado o Spam</Text>.
                        </Text>

                        <Button 
                            mode="contained" 
                            onPress={handleResendEmail}
                            disabled={loading || cooldown > 0}
                            style={styles.resendButton}
                            buttonColor="#E67E22"
                            labelStyle={styles.buttonLabel}
                            loading={loading}
                        >
                            {cooldown > 0 ? `Reenviar en ${cooldown}s` : "Reenviar correo ahora"}
                        </Button>

                        {attemptsLeft < 3 && cooldown === 0 && (
                            <Text style={styles.attemptsText}>
                                Intentos restantes (5h): {attemptsLeft}
                            </Text>
                        )}

                        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
                            <Text style={styles.logoutText}>¿Correo equivocado? Cerrar sesión</Text>
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>
        </Background.Image>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(230, 126, 34, 0.7)', // Naranja con transparencia
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    card: {
        width: '100%',
        maxWidth: 450,
        borderRadius: 25,
        elevation: 10,
        backgroundColor: '#FFF'
    },
    content: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    iconContainer: {
        marginBottom: 20,
        backgroundColor: '#FDF2E9',
        padding: 25,
        borderRadius: 75
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#D35400',
        marginBottom: 15,
        textAlign: 'center'
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        color: '#444',
        lineHeight: 30,
        marginBottom: 25
    },
    emailText: {
        fontWeight: 'bold',
        color: '#E67E22',
        fontSize: 22
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#FDF2E9',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#FABE7A'
    },
    infoText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 18,
        color: '#5D4037',
        lineHeight: 24
    },
    spamNotice: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 26
    },
    resendButton: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 15
    },
    buttonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    attemptsText: {
        marginTop: 15,
        fontSize: 14,
        color: '#E67E22',
        fontWeight: '600'
    },
    logoutContainer: {
        marginTop: 35
    },
    logoutText: {
        color: '#D35400',
        fontWeight: '700',
        fontSize: 17,
        textDecorationLine: 'underline'
    }
});

