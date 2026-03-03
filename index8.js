
const strategyLink = document.querySelector('a[href="#digitalStrategy"]');

strategyLink?.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Welcome to Digital Strategy!");
    
  
    const targetId = strategyLink.getAttribute('href');
    document.querySelector(targetId)?.scrollIntoView({
        behavior: 'smooth'
    });
});

const explorerHubLink = document.querySelector('a[href="#explorerHub]');

explorerHubLink?.addEventListener('click',(e) => {
    e.preventDefault();
        alert("welcome to explorer-hub");
  
     const targetId = explorerHubLink.getAttribute('href');
     document.querySelector(targetId)?.scrollIntoView({
        behavior: 'smooth'
     });
});

const globalRoaminglLink = document.querySelector('a[href="#globalRoaming"]');
globalRoaminglLink?.addEventListener('click',(e)=>{
    e.preventDefault();

    alert("welcome to global roamming");

    const targetId = globalRoaminglLink.getAttribute('href');
    document.querySelector(targetId)?.scrollIntoView({
        behavior:'smooth'
    });
});
const premiumHelpLink = document.querySelector('a[href="#premiumHelp]');
premiumHelpLink?.addEventListener('click',(e)=>{
    e.preventDefault();
    alert("welcome to premium-help");

    const targetId = premiumHelpLink.getAttribute('href');
    document.querySelector(targetId)?.scrollIntoView({
        behavior: 'smooth'
    });
})