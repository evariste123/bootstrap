document.getElementById('myForm').addEventListener('submit', function(e) {

    e.preventDefault();

    const username = document.getElementById('username').value;
    const usercode = document.getElementById('usercode').value;
    
  
    const category = document.querySelector('input[name="cat"]:checked')?.value;

  
    if (!category) {
        alert("Please select a Code Category!");
        return;
    }

   
    const formData = {
        contributor: username,
        category: category,
        htmlCode: usercode,
        timestamp: new Date().toLocaleString()
    };

  
    console.log("Uploading to EduHub...", formData);
    alert(`Success! ${username}, your code has been submitted.`);

    this.reset();
});
