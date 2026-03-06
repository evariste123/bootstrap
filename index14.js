
        function handleHome() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('Welcome back to EduHub Dashboard!');
        }

        function handleFile() {
            openModal('fileModal');
        }

        function handleUser() {
            openModal('userModal');
        }

        function handleMessage() {
            openModal('messageModal');
        }

        function handleNotification() {
            openModal('notificationModal');
            updateNotificationBadge();
        }

        function handleLocation() {
            openModal('locationModal');
        }

        function handleGraph() {
            openModal('graphModal');
            animateAnalytics();
        }

      
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('show');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('show');
        }

        function openFile(filename) {
            showNotification(`Opening ${filename}...`);
           
            setTimeout(() => {
                showNotification(`${filename} opened successfully!`);
            }, 1000);
        }

        function uploadFile() {
            showNotification('File upload dialog opened!');
          
        }

        function createFolder() {
            const folderName = prompt('Enter folder name:');
            if (folderName) {
                showNotification(`Folder "${folderName}" created!`);
            }
        }

        // User Profile Functions
        function editProfile() {
            showNotification('Profile editing mode activated!');
            // In a real app, this would make fields editable
        }

        function viewAchievements() {
            showNotification('Loading achievements...');
            // In a real app, this would open achievements modal
        }

        // Message Functions
        function openConversation(sender) {
            showNotification(`Opening conversation with ${sender}`);
            // In a real app, this would open chat interface
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            if (input.value.trim()) {
                showNotification('Message sent!');
                input.value = '';
            } else {
                showNotification('Please enter a message first!');
            }
        }

        // Notification Functions
        function markAsRead(notificationItem) {
            notificationItem.classList.remove('unread');
            updateNotificationBadge();
        }

        function markAllAsRead() {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            updateNotificationBadge();
            showNotification('All notifications marked as read!');
        }

        function clearNotifications() {
            document.querySelector('.notification-list').innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">No notifications</p>';
            updateNotificationBadge();
            showNotification('All notifications cleared!');
        }

        function updateNotificationBadge() {
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;
            const badge = document.querySelector('.nav-badge');
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }

        // Location Functions
        function getCurrentLocation() {
            if (navigator.geolocation) {
                showNotification('Getting your location...');
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        document.getElementById('latitude').textContent = position.coords.latitude.toFixed(6);
                        document.getElementById('longitude').textContent = position.coords.longitude.toFixed(6);
                        document.getElementById('accuracy').textContent = position.coords.accuracy.toFixed(0) + ' meters';

                        // Simulate reverse geocoding
                        document.getElementById('city').textContent = 'New York'; // Would be actual city
                        document.getElementById('country').textContent = 'USA'; // Would be actual country

                        document.getElementById('mapPlaceholder').textContent = `🗺️ Map centered at ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                        showNotification('Location updated successfully!');
                    },
                    (error) => {
                        showNotification('Unable to get location: ' + error.message);
                    }
                );
            } else {
                showNotification('Geolocation is not supported by this browser.');
            }
        }

        function findNearbySchools() {
            showNotification('Searching for nearby educational institutions...');
            // In a real app, this would use Google Places API or similar
            setTimeout(() => {
                showNotification('Found 5 schools within 5km radius!');
            }, 2000);
        }

        // Analytics Functions
        function animateAnalytics() {
            // Animate the analytics numbers
            const values = ['totalCourses', 'studyHours', 'certificates'];
            values.forEach(id => {
                const element = document.getElementById(id);
                const target = parseInt(element.textContent.replace(',', ''));
                animateNumber(element, 0, target, 1000);
            });
        }

        function animateNumber(element, start, end, duration) {
            const startTime = performance.now();
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const current = Math.floor(start + (end - start) * progress);
                element.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }

        function exportAnalytics() {
            showNotification('Generating analytics report...');
            setTimeout(() => {
                showNotification('Report downloaded successfully!');
            }, 2000);
        }

        function viewDetailedAnalytics() {
            showNotification('Loading detailed analytics...');
            // In a real app, this would show more detailed charts
        }
        // Welcome Modal Functionality
        function closeWelcomeModal() {
            const modal = document.getElementById('welcomeModal');
            modal.style.animation = 'modalFadeIn 0.5s ease-out reverse';
            setTimeout(() => {
                modal.style.display = 'none';
                // Check if first visit
                if (!localStorage.getItem('eduhubVisited')) {
                    localStorage.setItem('eduhubVisited', 'true');
                    showNotification('Welcome to EduHub! Explore our learning platform.');
                }
            }, 500);
        }

        // Animated Counter Functionality
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target === 1000 ? '∞' : target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }

        // Notification System
        function showNotification(message) {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');
            notificationText.textContent = message;
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Bounce Animation for Activity Items
        function bounceElement(element) {
            element.classList.add('bounce');
            setTimeout(() => {
                element.classList.remove('bounce');
            }, 1000);
        }

        // Dynamic Time Updates
        function updateActivityTimes() {
            const activityItems = document.querySelectorAll('.activity-time');
            const now = new Date();

            activityItems.forEach(item => {
                const timestamp = new Date(item.getAttribute('data-timestamp'));
                const diffMs = now - timestamp;
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffDays = Math.floor(diffHours / 24);

                if (diffHours < 24) {
                    item.textContent = `${diffHours} hours ago`;
                } else {
                    item.textContent = `${diffDays} days ago`;
                }
            });
        }

        // Card Hover Effects
        function addCardEffects() {
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Progress Bar Animation
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width;
                }, index * 200);
            });
        }

        // Random Activity Generator
        function generateRandomActivity() {
            const activities = [
                { icon: '📚', title: 'New Course Available: Python for Data Science', time: 'Just now' },
                { icon: '📖', title: 'New Book Added: "Machine Learning Basics"', time: '5 minutes ago' },
                { icon: '🤝', title: 'New Partnership Announced', time: '15 minutes ago' },
                { icon: '🎯', title: 'Tutorial Updated: Advanced CSS Techniques', time: '30 minutes ago' },
                { icon: '✈️', title: 'New Study Abroad Program Available', time: '1 hour ago' }
            ];

            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const activityList = document.getElementById('activityList');

            const newItem = document.createElement('li');
            newItem.className = 'activity-item';
            newItem.onclick = () => bounceElement(newItem);
            newItem.innerHTML = `
                <div class="activity-icon">${randomActivity.icon}</div>
                <div class="activity-content">
                    <div class="activity-title">${randomActivity.title}</div>
                    <div class="activity-time">${randomActivity.time}</div>
                </div>
            `;

            activityList.insertBefore(newItem, activityList.firstChild);

            // Remove oldest activity if more than 6
            if (activityList.children.length > 6) {
                activityList.removeChild(activityList.lastChild);
            }

            // Animate new item
            newItem.style.animation = 'none';
            setTimeout(() => {
                newItem.style.animation = 'fadeInUp 0.5s ease-out';
            }, 10);
        }

        // Theme System
        function setTheme(theme) {
            const body = document.body;
            const lightBtn = document.getElementById('lightTheme');
            const darkBtn = document.getElementById('darkTheme');

            if (theme === 'dark') {
                body.classList.add('dark-theme');
                darkBtn.classList.add('active');
                lightBtn.classList.remove('active');
            } else {
                body.classList.remove('dark-theme');
                lightBtn.classList.add('active');
                darkBtn.classList.remove('active');
            }

            localStorage.setItem('theme', theme);
            showNotification(`Theme changed to ${theme === 'dark' ? 'Dark' : 'Light'} mode`);
        }

        // Language System
        const translations = {
            en: {
                welcome: "🎓 Welcome to EduHub!",
                welcomeText: "Your journey to knowledge and growth starts here. Explore our comprehensive educational platform with interactive courses, digital library, and much more!",
                getStarted: "Get Started",
                dashboard: "EduHub Dashboard",
                tagline: "Your comprehensive educational platform for learning and growth",
                learningSections: "Learning Sections",
                knowledgeResources: "Knowledge Resources",
                accessAvailable: "Hours Access Available",
                interactiveLearning: "Interactive Learning",
                courses: "Courses",
                coursesDesc: "Dive deep into comprehensive courses covering programming, design, business, and more. Our interactive learning modules feature video lectures, hands-on projects, quizzes, and progress tracking with certificates upon completion.",
                library: "Books Library",
                libraryDesc: "Access our vast digital library with thousands of books across all disciplines. Browse by category, author, or use advanced search. Create personal reading lists, add notes, and track your reading progress with our intuitive interface.",
                partners: "Partner Applications",
                partnersDesc: "Connect with leading educational institutions and organizations. Submit partnership applications, track approval status, collaborate on joint programs, and access exclusive resources available only to our partners.",
                tutorials: "Tutorials",
                tutorialsDesc: "Master new skills with our step-by-step tutorials and guides. From beginner basics to advanced techniques, our tutorials include interactive exercises, code examples, and practical projects to reinforce your learning.",
                vacation: "Vacation Planning",
                vacationDesc: "Plan educational vacations and study abroad experiences. Get comprehensive guides for cultural immersion, language learning trips, academic exchanges, and adventure-based learning experiences around the world.",
                tracker: "Progress Tracker",
                trackerDesc: "Monitor your educational journey with detailed analytics and progress tracking. Set learning goals, track achievements, view performance metrics, and get personalized recommendations for your continued growth.",
                recentActivity: "Recent Activity",
                fileManager: "📁 File Manager",
                userProfile: "👤 User Profile",
                messages: "💬 Messages",
                notifications: "🔔 Notifications",
                location: "📍 Location Services",
                analytics: "📊 Analytics Dashboard",
                cookieTitle: "🍪 Cookie Preferences",
                cookieText: "We use cookies to enhance your experience on EduHub. By continuing to use our platform, you agree to our use of cookies to improve functionality and personalize content.",
                accept: "Accept All",
                decline: "Decline"
            },
            sw: {
                welcome: "🎓 Karibu EduHub!",
                welcomeText: "Safari yako ya maarifa na ukuaji inaanza hapa. Gundua jukwaa letu la kina la elimu lenye kozi zinazoingiliana, maktaba ya dijitali, na mengi zaidi!",
                getStarted: "Anza",
                dashboard: "Dashibodi ya EduHub",
                tagline: "Jukwaa lako la kina la elimu kwa ajili ya kujifunza na kukua",
                learningSections: "Sehemu za Kujifunza",
                knowledgeResources: "Rasilimali za Maarifa",
                accessAvailable: "Saa za Ufikiaji Zinazopatikana",
                interactiveLearning: "Kujifunza kwa Kuzingiliana",
                courses: "Kozi",
                coursesDesc: "Zama ndani ya kozi za kina zinazofunika programu, muundo, biashara, na zaidi. Moduli zetu za kujifunza zinazoingiliana zina video za mihadhara, miradi ya vitendo, maswali, na ufuatiliaji wa maendeleo pamoja na vyeti baada ya kukamilisha.",
                library: "Maktaba ya Vitabu",
                libraryDesc: "Fikia maktaba yetu kubwa ya dijitali yenye maelfu ya vitabu katika fani zote. Vinjari kwa kategoria, mwandishi, au tumia utafutaji wa kina. Tengeneza orodha za kusoma za kibinafsi, ongeza maelezo, na fuatilia maendeleo yako ya kusoma kwa kiolesura chetu cha urahisi.",
                partners: "Maombi ya Washirika",
                partnersDesc: "Ungana na taasisi na mashirika yanayoongoza ya elimu. Wasilisha maombi ya ushirikiano, fuatilia hali ya idhini, shirikiana katika mipango ya pamoja, na fikia rasilimali za kipekee zinazopatikana kwa washirika wetu pekee.",
                tutorials: "Mafunzo",
                tutorialsDesc: "Boresha ujuzi mpya kwa mafunzo yetu ya hatua kwa hatua na miongozo. Kuanzia misingi ya mwanzo hadi mbinu za hali ya juu, mafunzo yetu yanajumuisha mazoezi ya kuzingiliana, mifano ya msimbo, na miradi ya vitendo ili kuimarisha ujifunzaji wako.",
                vacation: "Upangaji wa Likizo",
                vacationDesc: "Panga likizo za elimu na uzoefu wa kusoma nje ya nchi. Pata miongozo ya kina kwa ajili ya kuzama katika utamaduni, safari za kujifunza lugha, mabadilishano ya kitaaluma, na uzoefu wa kujifunza wa adventure duniani kote.",
                tracker: "Kifuatilia Maendeleo",
                trackerDesc: "Fuata safari yako ya elimu kwa takwimu za kina na ufuatiliaji wa maendeleo. Weka malengo ya kujifunza, fuatilia mafanikio, angalia vipimo vya utendaji, na upate mapendekezo ya kibinafsi kwa ajili ya ukuaji wako wa kuendelea.",
                recentActivity: "Shughuli za Hivi Karibuni",
                fileManager: "📁 Kidhibiti Faili",
                userProfile: "👤 Wasifu wa Mtumiaji",
                messages: "💬 Ujumbe",
                notifications: "🔔 Arifa",
                location: "📍 Huduma za Mahali",
                analytics: "📊 Dashibodi ya Takwimu",
                cookieTitle: "🍪 Mapendeleo ya Vidakuzi",
                cookieText: "Tunatumia vidakuzi kuboresha uzoefu wako kwenye EduHub. Kwa kuendelea kutumia jukwaa letu, unakubali matumizi yetu ya vidakuzi kuboresha utendaji na kubinafsisha maudhui.",
                accept: "Kubali Zote",
                decline: "Kataa"
            },
            rw: {
                welcome: "🎓 Murakaza neza EduHub!",
                welcomeText: "Urugendo rwawe rwo kumenya no gutera imbere rutangira hano. Rondera urubuga rwacu rw'imikoro y'uburezi rufite amasomo y'ibikangurambaga, isomero ry'ibitabo by'ikoranabuhanga, n'ibindi byinshi!",
                getStarted: "Tangira",
                dashboard: "Dashibodi ya EduHub",
                tagline: "Urubuga rwawe rw'imikoro y'uburezi ku bw'iyigire no gutera imbere",
                learningSections: "Imyanya yo Kwiga",
                knowledgeResources: "Ibikoresho by'Ubumenyi",
                accessAvailable: "Amasaha yo Kubona Aboneka",
                interactiveLearning: "Kwiga mu buryo bw'ibikangurambaga",
                courses: "Amasomo",
                coursesDesc: "Injira mu masomo y'imikoro arimo porogaramu, igishushanyo, ubucuruzi, n'ibindi. Ibice byacu by'iyigire bibikangurambaga bifite amashusho y'amahugurwa, imishinga y'amaboko, ibibazo, no gukurikirana iterambere hamwe n'impamyabumenyi nyuma yo kurangiza.",
                library: "Isomero ry'Ibitabo",
                libraryDesc: "Bona isomero ryacu rinini ry'ikoranabuhanga rifite ibitabo ibihumbi mu byiciro byose. Rondera ku byiciro, umwanditsi, cyangwa ukoreshe ubushakashatsi bwimbitse. Kora ibitabo byawe byo gusoma, ongeze ibisobanuro, kandi ukurikirane iterambere ryawe ryo gusoma hakoreshejwe urubuga rwacu rworoshye.",
                partners: "Gusaba Abafatanyabikorwa",
                partnersDesc: "Huzuza n'amashuri n'imiryango iyobora uburezi. Ohereza ubusabe bw'ubufatanyabikorwa, kurikirana imiterere y'uburenganzira, fatanya mu mishinga ihuza, kandi ubone ibikoresho byihariye bihabwa abafatanyabikorwa bacu bonyine.",
                tutorials: "Inyigisho",
                tutorialsDesc: "Menyera ubumenyi bushya hakoreshejwe inyigisho zacu z'intambwe ku zindi n'amafasha. Uva ku misingi y'abatangizi kugeza ku buryo bwo hejuru, inyigisho zacu zirimo imyitozo ibikangurambaga, ingero z'kode, n'imishinga y'amaboko yo gushimangira kwiga kwawe.",
                vacation: "Guhitamo Ibiganiro",
                vacationDesc: "Hitamo ibiganiro by'uburezi n'ibitekerezo byo kwiga mu mahanga. Bona amafasha y'imikoro ku bijyanye no kuzamuka mu muco, ingendo zo kwiga indimi, guhana ubumenyi mu by'amashuri, n'ibitekerezo byo kwiga adventure ku isi yose.",
                tracker: "Mukurikirana Iterambere",
                trackerDesc: "Kurikirana urugendo rwawe rw'uburezi hakoreshejwe ibiharuro byimbitse no gukurikirana iterambere. Shyiraho intego zo kwiga, kurikirana ibyo wagezeho, reba ibipimo by'umurimo, kandi ubone inama zihariye ku bw'iterambere ryawe rirakomeza.",
                recentActivity: "Ibikorwa Bya Vuba",
                fileManager: "📁 Mukurikirana Amadosiye",
                userProfile: "👤 Umwirondoro w'Umukoresha",
                messages: "💬 Ubutumwa",
                notifications: "🔔 Amatangazo",
                location: "📍 Serivisi z'Ahantu",
                analytics: "📊 Dashibodi y'Ibiharuro",
                cookieTitle: "🍪 Ibyo Wakunda by'Amakuki",
                cookieText: "Dukoresha amakuki kugira ngo tuboneze ubunararibonye bwawe kuri EduHub. Uramaze gukomeza gukoresha urubuga rwacu, uremera ukoreshwa kwacu kw'amakuki kugira ngo tuboneze imikorere no kubika ibikubiyemo.",
                accept: "Emera Byose",
                decline: "Anka"
            },
            fr: {
                welcome: "🎓 Bienvenue sur EduHub!",
                welcomeText: "Votre voyage vers la connaissance et la croissance commence ici. Explorez notre plateforme éducative complète avec des cours interactifs, une bibliothèque numérique, et bien plus encore!",
                getStarted: "Commencer",
                dashboard: "Tableau de Bord EduHub",
                tagline: "Votre plateforme éducative complète pour l'apprentissage et la croissance",
                learningSections: "Sections d'Apprentissage",
                knowledgeResources: "Ressources de Connaissance",
                accessAvailable: "Heures d'Accès Disponibles",
                interactiveLearning: "Apprentissage Interactif",
                courses: "Cours",
                coursesDesc: "Plongez profondément dans des cours complets couvrant la programmation, le design, les affaires, et plus encore. Nos modules d'apprentissage interactifs offrent des conférences vidéo, des projets pratiques, des quiz, et un suivi des progrès avec des certificats à la fin.",
                library: "Bibliothèque de Livres",
                libraryDesc: "Accédez à notre vaste bibliothèque numérique avec des milliers de livres dans toutes les disciplines. Parcourez par catégorie, auteur, ou utilisez la recherche avancée. Créez des listes de lecture personnelles, ajoutez des notes, et suivez vos progrès de lecture avec notre interface intuitive.",
                partners: "Applications de Partenaires",
                partnersDesc: "Connectez-vous avec les principales institutions et organisations éducatives. Soumettez des demandes de partenariat, suivez le statut d'approbation, collaborez sur des programmes conjoints, et accédez à des ressources exclusives disponibles uniquement pour nos partenaires.",
                tutorials: "Tutoriels",
                tutorialsDesc: "Maîtrisez de nouvelles compétences avec nos tutoriels et guides étape par étape. Des bases pour débutants aux techniques avancées, nos tutoriels incluent des exercices interactifs, des exemples de code, et des projets pratiques pour renforcer votre apprentissage.",
                vacation: "Planification de Vacances",
                vacationDesc: "Planifiez des vacances éducatives et des expériences d'études à l'étranger. Obtenez des guides complets pour l'immersion culturelle, les voyages d'apprentissage des langues, les échanges académiques, et les expériences d'apprentissage d'aventure dans le monde entier.",
                tracker: "Suivi des Progrès",
                trackerDesc: "Surveillez votre parcours éducatif avec des analyses détaillées et un suivi des progrès. Définissez des objectifs d'apprentissage, suivez les réalisations, consultez les métriques de performance, et recevez des recommandations personnalisées pour votre croissance continue.",
                recentActivity: "Activité Récente",
                fileManager: "📁 Gestionnaire de Fichiers",
                userProfile: "👤 Profil Utilisateur",
                messages: "💬 Messages",
                notifications: "🔔 Notifications",
                location: "📍 Services de Localisation",
                analytics: "📊 Tableau de Bord Analytique",
                cookieTitle: "🍪 Préférences de Cookies",
                cookieText: "Nous utilisons des cookies pour améliorer votre expérience sur EduHub. En continuant à utiliser notre plateforme, vous acceptez notre utilisation des cookies pour améliorer les fonctionnalités et personnaliser le contenu.",
                accept: "Accepter Tout",
                decline: "Refuser"
            },
            pt: {
                welcome: "🎓 Bem-vindo ao EduHub!",
                welcomeText: "Sua jornada para o conhecimento e crescimento começa aqui. Explore nossa plataforma educacional abrangente com cursos interativos, biblioteca digital, e muito mais!",
                getStarted: "Começar",
                dashboard: "Painel EduHub",
                tagline: "Sua plataforma educacional abrangente para aprendizado e crescimento",
                learningSections: "Seções de Aprendizado",
                knowledgeResources: "Recursos de Conhecimento",
                accessAvailable: "Horas de Acesso Disponíveis",
                interactiveLearning: "Aprendizado Interativo",
                courses: "Cursos",
                coursesDesc: "Mergulhe profundamente em cursos abrangentes cobrindo programação, design, negócios, e muito mais. Nossos módulos de aprendizado interativos oferecem palestras em vídeo, projetos práticos, questionários, e rastreamento de progresso com certificados após a conclusão.",
                library: "Biblioteca de Livros",
                libraryDesc: "Acesse nossa vasta biblioteca digital com milhares de livros em todas as disciplinas. Navegue por categoria, autor, ou use pesquisa avançada. Crie listas de leitura pessoais, adicione notas, e acompanhe seu progresso de leitura com nossa interface intuitiva.",
                partners: "Aplicações de Parceiros",
                partnersDesc: "Conecte-se com as principais instituições e organizações educacionais. Envie aplicações de parceria, acompanhe o status de aprovação, colabore em programas conjuntos, e acesse recursos exclusivos disponíveis apenas para nossos parceiros.",
                tutorials: "Tutoriais",
                tutorialsDesc: "Domine novas habilidades com nossos tutoriais e guias passo a passo. Dos fundamentos básicos às técnicas avançadas, nossos tutoriais incluem exercícios interativos, exemplos de código, e projetos práticos para reforçar seu aprendizado.",
                vacation: "Planejamento de Férias",
                vacationDesc: "Planeje férias educacionais e experiências de estudo no exterior. Obtenha guias abrangentes para imersão cultural, viagens de aprendizado de idiomas, intercâmbios acadêmicos, e experiências de aprendizado de aventura em todo o mundo.",
                tracker: "Rastreador de Progresso",
                trackerDesc: "Monitore sua jornada educacional com análises detalhadas e rastreamento de progresso. Defina metas de aprendizado, acompanhe conquistas, visualize métricas de desempenho, e receba recomendações personalizadas para seu crescimento contínuo.",
                recentActivity: "Atividade Recente",
                fileManager: "📁 Gerenciador de Arquivos",
                userProfile: "👤 Perfil do Usuário",
                messages: "💬 Mensagens",
                notifications: "🔔 Notificações",
                location: "📍 Serviços de Localização",
                analytics: "📊 Painel de Análises",
                cookieTitle: "🍪 Preferências de Cookies",
                cookieText: "Usamos cookies para melhorar sua experiência no EduHub. Ao continuar usando nossa plataforma, você concorda com nosso uso de cookies para melhorar a funcionalidade e personalizar o conteúdo.",
                accept: "Aceitar Tudo",
                decline: "Recusar"
            }
        };

        let currentLanguage = 'en';

        function changeLanguage() {
            const select = document.getElementById('languageSelect');
            currentLanguage = select.value;
            applyTranslations();
            localStorage.setItem('language', currentLanguage);
            showNotification(`Language changed to ${select.options[select.selectedIndex].text}`);
        }

        function applyTranslations() {
            const t = translations[currentLanguage];

            // Update main elements
            document.querySelector('.modal-content h2').textContent = t.welcome;
            document.querySelector('.modal-content p').textContent = t.welcomeText;
            document.querySelector('.modal-button').textContent = t.getStarted;

            document.querySelector('.header h1').textContent = t.dashboard;
            document.querySelector('.header p').textContent = t.tagline;

            // Update stats
            const statLabels = document.querySelectorAll('.stat-label');
            statLabels[0].textContent = t.learningSections;
            statLabels[1].textContent = t.knowledgeResources;
            statLabels[2].textContent = t.accessAvailable;
            statLabels[3].textContent = t.interactiveLearning;

            // Update cards
            const cards = document.querySelectorAll('.dashboard-card');
            cards[0].querySelector('h3').textContent = t.courses;
            cards[0].querySelector('p').textContent = t.coursesDesc;

            cards[1].querySelector('h3').textContent = t.library;
            cards[1].querySelector('p').textContent = t.libraryDesc;

            cards[2].querySelector('h3').textContent = t.partners;
            cards[2].querySelector('p').textContent = t.partnersDesc;

            cards[3].querySelector('h3').textContent = t.tutorials;
            cards[3].querySelector('p').textContent = t.tutorialsDesc;

            cards[4].querySelector('h3').textContent = t.vacation;
            cards[4].querySelector('p').textContent = t.vacationDesc;

            cards[5].querySelector('h3').textContent = t.tracker;
            cards[5].querySelector('p').textContent = t.trackerDesc;

            // Update recent activity
            document.querySelector('.recent-activity h3').textContent = t.recentActivity;

            // Update modal titles
            document.querySelector('#fileModal .nav-modal-title').textContent = t.fileManager;
            document.querySelector('#userModal .nav-modal-title').textContent = t.userProfile;
            document.querySelector('#messageModal .nav-modal-title').textContent = t.messages;
            document.querySelector('#notificationModal .nav-modal-title').textContent = t.notifications;
            document.querySelector('#locationModal .nav-modal-title').textContent = t.location;
            document.querySelector('#graphModal .nav-modal-title').textContent = t.analytics;

            // Update cookie popup
            document.querySelector('.cookie-content h3').textContent = t.cookieTitle;
            document.querySelector('.cookie-content p').textContent = t.cookieText;
            document.querySelector('.cookie-btn.accept').textContent = t.accept;
            document.querySelector('.cookie-btn.decline').textContent = t.decline;
        }

        // Cookie System
        function acceptCookies() {
            localStorage.setItem('cookiesAccepted', 'true');
            document.getElementById('cookiePopup').classList.remove('show');
            showNotification('Cookies accepted! Thank you.');
        }

        function declineCookies() {
            localStorage.setItem('cookiesAccepted', 'false');
            document.getElementById('cookiePopup').classList.remove('show');
            showNotification('Cookies declined. Some features may be limited.');
        }

        // User Cycling System
        const users = [
            { name: 'Evariste Bapfekurera', email: 'evariste.bapfekurera@eduhub.edu', avatar: '👨‍🎓' },
            { name: 'Aline', email: 'aline@eduhub.edu', avatar: '👩‍🎓' },
            { name: 'Joselyne', email: 'joselyne@eduhub.edu', avatar: '👩‍🏫' },
            { name: 'Clairia', email: 'clairia@eduhub.edu', avatar: '👩‍💼' },
            { name: 'Bonheur', email: 'bonheur@eduhub.edu', avatar: '👨‍💻' }
        ];

        let currentUserIndex = 0;

        function cycleUser() {
            currentUserIndex = (currentUserIndex + 1) % users.length;
            const user = users[currentUserIndex];

            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userAvatar').textContent = user.avatar;

            localStorage.setItem('currentUser', currentUserIndex);
            showNotification(`Switched to ${user.name}'s profile`);
        }

        // Initialize Dashboard
        function initDashboard() {
            // Load saved preferences
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);

            const savedLanguage = localStorage.getItem('language') || 'en';
            document.getElementById('languageSelect').value = savedLanguage;
            currentLanguage = savedLanguage;
            applyTranslations();

            const savedUser = localStorage.getItem('currentUser') || 0;
            currentUserIndex = parseInt(savedUser);
            const user = users[currentUserIndex];
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userAvatar').textContent = user.avatar;

            // Check cookie consent
            const cookiesAccepted = localStorage.getItem('cookiesAccepted');
            if (cookiesAccepted === null) {
                setTimeout(() => {
                    document.getElementById('cookiePopup').classList.add('show');
                }, 2000);
            }

            // Check for welcome modal
            if (!localStorage.getItem('eduhubVisited')) {
                document.getElementById('welcomeModal').style.display = 'flex';
            } else {
                document.getElementById('welcomeModal').style.display = 'none';
            }

            // Initialize notification badge
            updateNotificationBadge();

            // Start animations
            setTimeout(() => {
                animateCounters();
                animateProgressBars();
            }, 500);

            // Update times
            updateActivityTimes();
            setInterval(updateActivityTimes, 60000); // Update every minute

            // Add card effects
            addCardEffects();

            // Generate random activities periodically
            setInterval(generateRandomActivity, 30000); // Every 30 seconds

            // Add pulse effect to random cards
            setInterval(() => {
                const cards = document.querySelectorAll('.dashboard-card');
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                randomCard.classList.add('pulse');
                setTimeout(() => {
                    randomCard.classList.remove('pulse');
                }, 2000);
            }, 10000); // Every 10 seconds
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', initDashboard);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeWelcomeModal();
                // Close any open nav modals
                document.querySelectorAll('.nav-modal.show').forEach(modal => {
                    modal.classList.remove('show');
                });
            }
            if (e.key === 't' && e.ctrlKey) {
                toggleTheme();
            }
            // Navigation shortcuts
            if (e.altKey) {
                switch(e.key) {
                    case 'h': handleHome(); break;
                    case 'f': handleFile(); break;
                    case 'u': handleUser(); break;
                    case 'm': handleMessage(); break;
                    case 'n': handleNotification(); break;
                    case 'l': handleLocation(); break;
                    case 'g': handleGraph(); break;
                }
            }
        });

        // Mobile sidebar toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const sidebar = document.getElementById('sidebar');

        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mobileToggle.classList.toggle('open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                    mobileToggle.classList.remove('open');
                }
            }
        });

        // Prevent card links from triggering when buttons are clicked
        document.querySelectorAll('.card-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const card = button.closest('.dashboard-card');
                const link = card.getAttribute('href');
                showNotification(`${card.querySelector('.card-title').textContent} section opened!`);
                setTimeout(() => {
                    window.location.href = link;
                }, 1000);
            });
        });