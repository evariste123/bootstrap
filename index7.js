
    function generateKey(){
      const parts = [];
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for(let p=0;p<4;p++){
        let s="";
        for(let i=0;i<16;i++) s += chars[Math.floor(Math.random()*chars.length)];
        parts.push(s);
      }
      return parts.join("-");
    }

    function addMonths(date, months) {
      const d = new Date(date);
      const day = d.getDate();
      d.setMonth(d.getMonth() + months);
    
      if (d.getDate() < day) d.setDate(0);
      return d;
    }

    function formatDate(d){
      return d.toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'});
    }

    function handleSignup(evt){
      evt.preventDefault();
      const form = evt.target;
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      const key = generateKey();
      const now = new Date();
      const expiry = addMonths(now, 3);
      document.getElementById('apiKey').textContent = key;
      document.getElementById('expiry').textContent = formatDate(expiry) + " (approx)";
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').scrollIntoView({behavior:'smooth'});

    }

    function copyKey(){
      const key = document.getElementById('apiKey').textContent;
      navigator.clipboard?.writeText(key).then(()=> {
        alert('API key copied to clipboard');
      }).catch(()=> {
       
        const ta = document.createElement('textarea');
        ta.value = key;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        alert('API key copied to clipboard');
      });
    }

    function revokeKey(){
      if(!confirm('Revoke this demo key? This only clears the display in this prototype.')) return;
      document.getElementById('apiKey').textContent = '—';
      document.getElementById('expiry').textContent = '—';
    }

    function fillDemo(){
      document.getElementById('name').value = 'Demo User';
      document.getElementById('email').value = 'demo@company.com';
      document.getElementById('company').value = 'Demo Inc';
      document.getElementById('usage').value = 'Prototype / POC';
      document.getElementById('agree').checked = true;
    }