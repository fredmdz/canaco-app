import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
    Dimensions, ActivityIndicator, Alert, Linking, Animated, SafeAreaView
} from 'react-native';
import { routes } from '../../routes';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { servicesFirebase } from "../../services/servicesFirebase";
import { UserContext } from '../../context/UserContext';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const SLIDER_HEIGHT = width * 0.55;

const VerInicio = ({ navigation }) => {
    // Consume el contexto del usuario
    const { userData, loadingUser } = useContext(UserContext);
    const canAccessAffiliateContent = userData?.isAffiliate && userData?.affiliationStatusDisplay?.status !== 'expired';

    const [eventosFirebase, setEventosFirebase] = useState([]);
    const [cursosFirebase, setCursosFirebase] = useState([]);
    const [sliderImages, setSliderImages] = useState([]);
    const [loading, setLoading] = useState({
        eventos: true,
        cursos: true,
        slider: true
    });

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch data
    const fetchData = async () => {
        try {
            const [eventos, cursos, banners] = await Promise.all([
                servicesFirebase.getAll("eventos"),
                servicesFirebase.getAll("cursos"),
                servicesFirebase.getAll("banners")
            ]);

            // Procesar eventos
            const now = dayjs();
            const eventosActivos = (eventos || []).filter(data => {
                const fechaInicio = data.fechaInicio?.toDate?.() ? dayjs(data.fechaInicio.toDate()) : null;
                const fechaFin = data.fechaFin?.toDate?.() ? dayjs(data.fechaFin.toDate()) : null;
                
                if (fechaInicio && fechaFin) {
                    return now.isSameOrBefore(fechaFin, 'day') && 
                            (now.isBetween(fechaInicio, fechaFin, null, '[]') || 
                            now.isSameOrBefore(fechaInicio, 'day'));
                }
                return fechaInicio && now.isSameOrBefore(fechaInicio, 'day');
            }).sort((a, b) => {
                const dateA = a.fechaInicio?.toDate?.() || new Date();
                const dateB = b.fechaInicio?.toDate?.() || new Date();
                return dateA - dateB;
            }).slice(0, 5);

            // Procesar cursos
            const relevanceWindowDays = 90;
            const pastRelevantDate = now.subtract(relevanceWindowDays, 'day');
            
            const cursosActivos = (cursos || []).filter(curso => {
                const fechaInicio = curso.fechaInicio?.toDate?.() ? dayjs(curso.fechaInicio.toDate()) : null;
                return fechaInicio && (now.isSameOrBefore(fechaInicio, 'day') || 
                            fechaInicio.isAfter(pastRelevantDate, 'day'));
            }).sort((a, b) => {
                const dateA = a.fechaInicio?.toDate?.() || new Date();
                const dateB = b.fechaInicio?.toDate?.() || new Date();
                return dateA - dateB;
            }).slice(0, 5);

            setEventosFirebase(eventosActivos);
            setCursosFirebase(cursosActivos);
            setSliderImages(banners || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "No se pudieron cargar los datos");
        } finally {
            setLoading({
                eventos: false,
                cursos: false,
                slider: false
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Slider automático
    useEffect(() => {
        if (sliderImages.length <= 1) return;
        
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % sliderImages.length;
            setCurrentIndex(nextIndex);
            scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, sliderImages.length]);

    const renderSlider = () => {
        if (loading.slider) {
            return (
                <View style={[styles.sliderContainer, styles.loadingSlider]}>
                    <ActivityIndicator size="large" color="#314c95" />
                </View>
            );
        }

        if (!sliderImages.length) {
            return null;
        }

        return (
            <View style={styles.sliderWrapper}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.sliderContainer}
                    onMomentumScrollEnd={e => {
                        const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(newIndex);
                    }}
                >
                    {sliderImages.map((banner) => (
                        <TouchableOpacity
                            key={banner.id}
                            // Verificamos si existe un link 'web' antes de intentar abrirlo
                            onPress={() => banner.web && Linking.openURL(banner.web)}
                            activeOpacity={0.9}
                        >
                            <Image
                                source={{ uri: banner.images }}
                                style={styles.sliderImage}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                
                <View style={styles.pagination}>
                    {sliderImages.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === currentIndex && styles.activeDot
                            ]}
                        />
                    ))}
                </View>
            </View>
        );
    };

    const accesoRapidoItems = [
        { id: '1', title: 'Eventos', icon: 'calendar-month', route: routes.DRAWER.EVENTOS },
        { id: '2', title: 'Cursos', icon: 'book-open', route: routes.DRAWER.CURSOS },
        { id: '3', title: 'Directorio', icon: 'account-group', route: routes.DRAWER.CONTACTOS },
        { id: '4', title: 'Promociones', icon: 'tag-multiple', route: routes.DRAWER.OFERTAS, type: 'promotions' },
    ];

    const renderAccesoRapidoItem = (item) => {
        const isLocked = item.type === 'promotions' && !canAccessAffiliateContent;
        
        const handlePress = () => {
            if (isLocked) {
                Alert.alert(
                    "Exclusivo Afiliados",
                    "Desbloquea este contenido afiliándote a CANACO SERVYTUR",
                    [{ text: "Entendido" }]
                );
            } else {
                navigation.navigate(item.route);
            }
        };

        return (
            <TouchableOpacity
                key={item.id}
                style={[styles.accesoRapidoCard, isLocked && styles.lockedCard]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <View style={[styles.accesoRapidoIconContainer, isLocked && styles.lockedIconContainer]}>
                    <Icon 
                        name={item.icon} 
                        size={28} 
                        color={isLocked ? "#AAA" : "#314c95"} 
                    />
                </View>
                <Text style={[styles.accesoRapidoText, isLocked && styles.lockedText]}>
                    {item.title}
                </Text>
                {isLocked && <Icon name="lock" size={18} color="#AAA" style={styles.lockIcon} />}
            </TouchableOpacity>
        );
    };

    const renderEventoCursoCard = (item, isEvento = true) => {
        const fecha = item.fechaInicio?.toDate?.() 
            ? dayjs(item.fechaInicio.toDate()).format('DD MMM YYYY')
            : item.duracion || 'Fecha no definida';

        return (
            <TouchableOpacity
                key={item.id}
                style={styles.horizontalCard}
                onPress={() => navigation.navigate(
                    isEvento ? routes.DRAWER.EVENTOS : routes.DRAWER.CURSOS,
                    {
                        screen: isEvento ? routes.EVENTOS.VER_EVENTO : routes.CURSOS.VER_CURSO,
                        params: { 
                            [isEvento ? 'dataEventos' : 'dataCursos']: item 
                        }
                    }
                )}
            >
                <Image
                    source={{ uri: item.images || item.imagen || 'https://via.placeholder.com/300' }}
                    style={styles.horizontalImage}
                />
                <View style={styles.horizontalContent}>
                    <Text style={styles.horizontalTitle} numberOfLines={1}>
                        {item.name || item.titulo || item.nombre || 'Sin título'}
                    </Text>
                    <View style={styles.horizontalMeta}>
                        <Icon name={isEvento ? 'calendar' : 'clock'} size={14} color="#666" />
                        <Text style={styles.horizontalDate}>{fecha}</Text>
                    </View>
                    {/* Se eliminó la descripción. El espacio se ajusta automáticamente. */}
                    <View style={styles.horizontalFooter}>
                        <Text style={styles.horizontalActionText}>
                            {isEvento ? 'Ver detalles' : 'Ver curso'}
                        </Text>
                        <Icon name="chevron-right" size={18} color="#314c95" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (loadingUser) {
        return (
            <View style={styles.loadingScreen}>
                <ActivityIndicator size="large" color="#314c95" />
                <Text style={styles.loadingText}>Cargando aplicación...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeBanner}>
                <Text style={styles.welcomeText}>
                    Te damos la bienvenida,
                </Text>
                <Text style={styles.welcomeSubtitle}>
                    {userData?.nombre?.split(' ')[0] || 'Afiliado'}
                </Text>
            </View>

            {/* Slider */}
            {renderSlider()}

            {/* Acceso Rápido */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Acceso Rápido</Text>
            </View>
            <View style={styles.accesoRapidoGrid}>
                {accesoRapidoItems.map(renderAccesoRapidoItem)}
            </View>

            {/* Eventos */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Próximos Eventos</Text>
                <TouchableOpacity onPress={() => navigation.navigate(routes.DRAWER.EVENTOS)}>
                    <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
            </View>
            {loading.eventos ? (
                <ActivityIndicator size="large" color="#314c95" style={styles.loadingSection} />
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    {eventosFirebase.length > 0 ? (
                        eventosFirebase.map(item => renderEventoCursoCard(item, true))
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Icon name="calendar-remove" size={40} color="#CCC" />
                            <Text style={styles.noDataText}>No hay eventos próximos.</Text>
                        </View>
                    )}
                </ScrollView>
            )}

            {/* Cursos */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Nuestros Cursos</Text>
                <TouchableOpacity onPress={() => navigation.navigate(routes.DRAWER.CURSOS)}>
                    <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
            </View>
            {loading.cursos ? (
                <ActivityIndicator size="large" color="#314c95" style={styles.loadingSection} />
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    {cursosFirebase.length > 0 ? (
                        cursosFirebase.map(item => renderEventoCursoCard(item, false))
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Icon name="book-remove" size={40} color="#CCC" />
                            <Text style={styles.noDataText}>No hay cursos disponibles.</Text>
                        </View>
                    )}
                </ScrollView>
            )}

            <View style={styles.footer}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#314c95',
    },
    welcomeBanner: {
        backgroundColor: '#314c95',
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '300',
        color: '#FFF',
    },
    welcomeSubtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#314c95',
    },
    accesoRapidoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    accesoRapidoCard: {
        width: '48%',
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    accesoRapidoIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(49, 76, 149, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    accesoRapidoText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#314c95',
        textAlign: 'center',
    },
    lockedCard: {
        backgroundColor: '#F9F9F9',
        borderColor: '#EEE',
    },
    lockedIconContainer: {
        backgroundColor: 'rgba(170, 170, 170, 0.1)',
    },
    lockedText: {
        color: '#AAA',
    },
    lockIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    sliderWrapper: {
        height: SLIDER_HEIGHT,
        marginBottom: 20,
    },
    sliderContainer: {
        width,
        height: SLIDER_HEIGHT,
    },
    loadingSlider: {
        justifyContent: 'center',
        alignItems: 'center',
        height: SLIDER_HEIGHT,
    },
    sliderImage: {
        width,
        height: SLIDER_HEIGHT,
    },
    pagination: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#FFF',
        width: 20,
    },
    horizontalScrollContainer: {
        paddingLeft: 20,
        paddingRight: 5,
        marginBottom: 20,
    },
    horizontalCard: {
        width: CARD_WIDTH,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    horizontalImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    horizontalContent: {
        padding: 15,
        justifyContent: 'space-between',
        flex: 1,
    },
    horizontalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 5,
    },
    horizontalMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontalDate: {
        fontSize: 13,
        color: '#666',
        marginLeft: 5,
    },
    horizontalFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    horizontalActionText: {
        fontSize: 14,
        color: '#314c95',
        fontWeight: '600',
        marginRight: 5,
    },
    loadingSection: {
        marginVertical: 30,
    },
    noDataContainer: {
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginRight: 15,
    },
    noDataText: {
        marginTop: 10,
        color: '#666',
        fontSize: 15,
        textAlign: 'center',
    },
    footer: {
        height: 30,
    },
});

export default VerInicio;