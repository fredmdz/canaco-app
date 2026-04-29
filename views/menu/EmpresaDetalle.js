import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform, Alert, Dimensions, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const BRAND_PRIMARY = '#314c95';
const BACKGROUND_LIGHT = '#F5F7FA';
const CARD_BACKGROUND = '#FFFFFF';
const TEXT_PRIMARY = '#263238';
const TEXT_SECONDARY = '#757575';
const BORDER_COLOR = '#E0E0E0';

export default function EmpresaDetalle({ navigation, route }) {
    const { empresa } = route.params;
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            statusBarHeight: insets.top,
        });
    }, [navigation, insets]);

    const goBack = () => {
        navigation.goBack();
    };

    const handleOpenMap = () => {
        const address = empresa.ubicacion;
        if (address) {
            const encodedAddress = encodeURIComponent(address);
            const mapUrl = Platform.select({
                ios: `maps:0,0?q=${encodedAddress}`,
                android: `geo:0,0?q=${encodedAddress}`,
                default: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
            });

            Linking.openURL(mapUrl).catch(err => {
                console.error('Error al abrir mapa:', err);
                Alert.alert('Error', 'No se pudo abrir la app de mapas. Asegúrate de tener una instalada.');
            });
        } else {
            Alert.alert('Información', 'No hay dirección disponible.');
        }
    };

    const handleWhatsApp = () => {
        const numeroLimpio = empresa.whatsapp?.replace(/[^0-9]/g, '') || '';
        const numeroWhatsApp = numeroLimpio.startsWith('52') ? numeroLimpio : `52${numeroLimpio}`;

        if (numeroLimpio) {
            const url = `whatsapp://send?phone=${numeroWhatsApp}`;
            Linking.openURL(url).catch(() => {
                const webUrl = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}`;
                Linking.openURL(webUrl).catch(err => {
                    console.error('Error con WhatsApp:', err);
                    Alert.alert('Error', 'No se pudo abrir WhatsApp.');
                });
            });
        } else {
            Alert.alert('Información', 'No hay número de WhatsApp disponible.');
        }
    };

    const handleCall = () => {
        const numeroLimpio = empresa.telefono?.replace(/[^0-9]/g, '') || '';
        if (numeroLimpio) {
            Linking.openURL(`tel:${numeroLimpio}`).catch(err => {
                console.error('Error al llamar:', err);
                Alert.alert('Error', 'No se pudo iniciar la llamada.');
            });
        } else {
            Alert.alert('Información', 'No hay número de teléfono disponible.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: BRAND_PRIMARY, paddingTop: insets.top + 20 }]}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Icon name="arrow-left" size={28} color={CARD_BACKGROUND} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: CARD_BACKGROUND }]} numberOfLines={1} ellipsizeMode="tail">{empresa.nombre}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {empresa.imagen && (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setModalVisible(true)}
                        style={styles.imageCard}
                    >
                        <Image source={{ uri: empresa.imagen }} style={styles.companyImage} />
                    </TouchableOpacity>
                )}
                
                <View style={styles.content}>
                    {empresa.descripcionCompleta && (
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Descripción</Text>
                            <Text style={styles.description}>{empresa.descripcionCompleta}</Text>
                        </View>
                    )}
                    
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>Contacto</Text>
                        {empresa.ubicacion && (
                            <TouchableOpacity onPress={handleOpenMap} style={styles.contactButton}>
                                <Icon name="map-marker-outline" size={24} color={BRAND_PRIMARY} />
                                <Text style={styles.buttonText}>{empresa.ubicacion}</Text>
                            </TouchableOpacity>
                        )}
                        {empresa.telefono && (
                            <TouchableOpacity onPress={handleCall} style={styles.contactButton}>
                                <Icon name="phone-outline" size={24} color={BRAND_PRIMARY} />
                                <Text style={styles.buttonText}>Llamar a {empresa.telefono}</Text>
                            </TouchableOpacity>
                        )}
                        {empresa.whatsapp && (
                            <TouchableOpacity onPress={handleWhatsApp} style={styles.contactButton}>
                                <Icon name="whatsapp" size={24} color={BRAND_PRIMARY} />
                                <Text style={styles.buttonText}>Enviar WhatsApp a {empresa.whatsapp}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>

            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1}
                >
                    {empresa.imagen && <Image source={{ uri: empresa.imagen }} style={styles.modalImage} resizeMode="contain" />}
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_LIGHT,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 15,
        padding: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
    },
    imageCard: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 15,
        padding: 10,
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
    companyImage: {
        width: width * 0.8,
        height: width * 0.6,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionCard: {
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: BRAND_PRIMARY,
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    description: {
        fontSize: 16,
        color: TEXT_PRIMARY,
        lineHeight: 24,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BRAND_PRIMARY + '10',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 17,
        color: BRAND_PRIMARY,
        fontWeight: '600',
        marginLeft: 15,
        flex: 1,
        flexWrap: 'wrap',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: width * 0.9,
        height: height * 0.7,
    },
});