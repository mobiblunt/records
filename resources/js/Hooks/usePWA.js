import { useState, useEffect } from 'react';

export default function usePWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [browserInfo, setBrowserInfo] = useState({});

    useEffect(() => {
        // Detect device and browser
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isIOSChrome = iOS && /CriOS/.test(navigator.userAgent);
        const isIOSSafari = iOS && /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
        const standalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
        
        const info = {
            isIOS: iOS,
            isIOSChrome,
            isIOSSafari,
            isStandalone: standalone,
            isAndroid: /Android/.test(navigator.userAgent),
            isChrome: /Chrome/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent),
            userAgent: navigator.userAgent
        };

        setIsIOS(iOS);
        setIsStandalone(standalone);
        setBrowserInfo(info);

        console.log('PWA Browser Info:', info);

        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }

        // Show install button logic
        if (!standalone) {
            if (iOS) {
                // For iOS (both Safari and Chrome), show manual instructions
                setShowInstallButton(true);
            } else {
                // For Android/Desktop Chrome, wait for beforeinstallprompt
                const handleBeforeInstallPrompt = (e) => {
                    console.log('beforeinstallprompt event fired');
                    e.preventDefault();
                    setDeferredPrompt(e);
                    setShowInstallButton(true);
                };

                window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

                // Cleanup
                return () => {
                    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                };
            }
        }
    }, []);

    const handleInstall = async () => {
        if (isIOS) {
            // For iOS, we can't programmatically install, just show instructions
            return;
        }

        if (!deferredPrompt) {
            console.log('No deferred prompt available');
            return;
        }

        console.log('Showing install prompt');
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log('User choice:', outcome);
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        
        setDeferredPrompt(null);
        setShowInstallButton(false);
    };

    const dismissInstall = () => {
        setShowInstallButton(false);
    };

    return { 
        showInstallButton, 
        handleInstall, 
        dismissInstall,
        isIOS, 
        isStandalone, 
        browserInfo 
    };
}