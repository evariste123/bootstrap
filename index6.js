// ============================================
// FOOD ORDERING SYSTEM - COMPLETE JAVASCRIPT
// ============================================

// Order Management
let orderItems = [];
let itemId = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeAddToOrderButtons();
    initializeClearOrderButton();
    initializeFormValidation();
    initializeChat();
});



function initializeAddToOrderButtons() {
    const addButtons = document.querySelectorAll('button');
    addButtons.forEach(button => {
        if (button.textContent.trim() === 'Add to Order') {
            button.addEventListener('click', handleAddToOrder);
        }
    });
}

function handleAddToOrder(event) {
    const button = event.target;
    const productCard = button.closest('div[class^="card"]');
    
    if (!productCard) return;
    

    const productName = productCard.querySelector('h4')?.textContent.trim() || 'Unknown Product';
    const priceText = Array.from(productCard.querySelectorAll('p strong')).find(
        p => p.textContent.includes('Price')
    )?.nextSibling?.textContent.trim();
    
    if (!priceText) {
        showNotification('Could not extract price', 'error');
        return;
    }
    
    const price = parseFloat(priceText.replace('$', '').trim());
    
    if (isNaN(price)) {
        showNotification('Invalid price format', 'error');
        return;
    }
    
 
    const orderItem = {
        id: itemId++,
        name: productName,
        price: price
    };
    
    // Add to order
    orderItems.push(orderItem);
    updateOrderSummary();
    showNotification(`✅ ${productName} added to order!`, 'success');
    
    // Visual feedback on button
    button.textContent = 'Added ✓';
    button.style.backgroundColor = '#28a745';
    setTimeout(() => {
        button.textContent = 'Add to Order';
        button.style.backgroundColor = '';
    }, 1500);
}

// ============================================
// ORDER SUMMARY MANAGEMENT
// ============================================

function updateOrderSummary() {
    const summaryCard = document.querySelector('.card12');
    if (!summaryCard) return;
    
    // Clear existing items
    const itemsList = summaryCard.querySelectorAll('i');
    itemsList.forEach(item => item.remove());
    
    // Add current items
    const firstP = summaryCard.querySelector('p');
    const itemsContainer = firstP.parentElement;
    
    orderItems.forEach(item => {
        const itemElement = document.createElement('i');
        itemElement.innerHTML = `${item.name} - $${item.price.toFixed(2)} - <button class="remove-btn" onclick="removeFromOrder(${item.id})">Remove</button>`;
        itemElement.style.cssText = `
            display: block;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            animation: slideIn 0.3s ease-out;
        `;
        itemsContainer.appendChild(itemElement);
    });
    
    // Update total
    const total = orderItems.reduce((sum, item) => sum + item.price, 0);
    const totalElement = summaryCard.querySelector('p strong');
    if (totalElement) {
        totalElement.textContent = `Total Price: $${total.toFixed(2)}`;
        totalElement.style.color = total > 0 ? '#28a745' : '#666';
    }
    
    // Update placeholder text
    if (orderItems.length === 0) {
        firstP.textContent = 'Items added to order will appear here';
        firstP.style.color = '#999';
    } else {
        firstP.textContent = '';
    }
}

function removeFromOrder(id) {
    const itemName = orderItems.find(item => item.id === id)?.name || 'Item';
    orderItems = orderItems.filter(item => item.id !== id);
    updateOrderSummary();
    showNotification(`🗑️ ${itemName} removed from order`, 'info');
}

function initializeClearOrderButton() {
    const clearButton = document.querySelector('.card12 button:not(.remove-btn)');
    if (clearButton && clearButton.textContent.trim() === 'Clear Order') {
        clearButton.addEventListener('click', handleClearOrder);
    }
}

function handleClearOrder() {
    if (orderItems.length === 0) {
        showNotification('Your order is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear your entire order?')) {
        orderItems = [];
        itemId = 0;
        updateOrderSummary();
        showNotification('🗑️ Order cleared', 'info');
    }
}

// ============================================
// NOTIFICATIONS/MESSAGES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set color based on type
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'info': '#17a2b8',
        'warning': '#ffc107'
    };
    notification.style.backgroundColor = colors[type] || colors['info'];
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// FORM VALIDATION
// ============================================

function initializeFormValidation() {
    const form = document.getElementById('form');
    if (!form) return;
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Handle reset button
    const resetBtn = form.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Clear the form and your order?')) {
                form.reset();
                orderItems = [];
                itemId = 0;
                updateOrderSummary();
                clearAllErrors();
                showNotification('Form cleared', 'info');
            }
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMsg = '';
    
    switch(field.id) {
        case 'name':
            isValid = value.length >= 2;
            errorMsg = 'Name must be at least 2 characters';
            break;
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            errorMsg = 'Please enter a valid email address';
            break;
        case 'phone':
            isValid = /^[\+]?[1-9][\d\s\-\(\)]{8,}$/.test(value.replace(/\s/g, ''));
            errorMsg = 'Please enter a valid phone number';
            break;
        case 'address':
            isValid = value.length >= 10;
            errorMsg = 'Address must be at least 10 characters';
            break;
    }
    
    if (!isValid && value !== '') {
        showFieldError(field, errorMsg);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = '⚠️ ' + message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        animation: fadeIn 0.3s ease-in;
    `;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    field.style.borderColor = '#dc3545';
    field.style.borderWidth = '2px';
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '#ddd';
    field.style.borderWidth = '1px';
}

function clearAllErrors() {
    const form = document.getElementById('form');
    if (!form) return;
    
    const errorDivs = form.querySelectorAll('.field-error');
    errorDivs.forEach(div => div.remove());
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#ddd';
        input.style.borderWidth = '1px';
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate order
    if (orderItems.length === 0) {
        showNotification('❌ Please add items to your order first!', 'error');
        return;
    }
    
    // Validate all fields
    const form = e.target;
    const fields = ['name', 'email', 'phone', 'address'];
    let isFormValid = true;
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('❌ Please fix the errors in the form', 'error');
        return;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const customerInfo = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        address: formData.get('address').trim(),
        instructions: formData.get('instructions').trim(),
        payment: formData.get('payment')
    };
    
    // Calculate pricing
    const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = subtotal > 25 ? 0 : 3.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;
    
    // Create order
    const order = {
        id: Date.now(),
        items: [...orderItems],
        customer: customerInfo,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        tax: tax,
        total: total,
        timestamp: new Date().toLocaleString(),
        status: 'Confirmed'
    };
    
    // Save to localStorage
    saveOrder(order);
    
    // Show confirmation
    showOrderConfirmation(order);
    
    // Reset form
    form.reset();
    clearAllErrors();
    orderItems = [];
    itemId = 0;
    updateOrderSummary();
}

function saveOrder(order) {
    try {
        const orders = JSON.parse(localStorage.getItem('foodOrders') || '[]');
        orders.push(order);
        localStorage.setItem('foodOrders', JSON.stringify(orders));
    } catch (error) {
        console.warn('Could not save order:', error);
    }
}

// ============================================
// ORDER CONFIRMATION MODAL
// ============================================

function showOrderConfirmation(order) {
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const itemsList = order.items.map(item => 
        `<li>${item.name} - $${item.price.toFixed(2)}</li>`
    ).join('');
    
    modal.innerHTML = `
        <div class="confirmation-content" style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            position: relative;
        ">
            <span class="close-btn" onclick="closeConfirmation()" style="
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                cursor: pointer;
                color: #666;
            ">&times;</span>
            
            <h2 style="color: #28a745; text-align: center; margin-bottom: 20px;">
                🎉 Order Confirmed!
            </h2>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date & Time:</strong> ${order.timestamp}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>
            
            <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">Order Items:</h3>
            <ul style="list-style: none; padding: 0;">
                ${itemsList}
            </ul>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
                <p><strong>Delivery Fee:</strong> $${order.deliveryFee.toFixed(2)}</p>
                <p><strong>Tax (8%):</strong> $${order.tax.toFixed(2)}</p>
                <p style="font-size: 18px; color: #28a745; border-top: 2px solid #ddd; padding-top: 10px; margin-top: 10px;">
                    <strong>Total: $${order.total.toFixed(2)}</strong>
                </p>
            </div>
            
            <h3 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">Delivery Details:</h3>
            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <p><strong>Phone:</strong> ${order.customer.phone}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            <p><strong>Payment Method:</strong> ${formatPaymentMethod(order.customer.payment)}</p>
            ${order.customer.instructions ? `<p><strong>Special Instructions:</strong> ${order.customer.instructions}</p>` : ''}
            
            <div style="text-align: center; margin-top: 25px;">
                <button onclick="printOrder(${order.id})" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    margin: 0 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.3s;
                " onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                    🖨️ Print Receipt
                </button>
                <button onclick="closeConfirmation()" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    margin: 0 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.3s;
                " onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                    ✓ Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeConfirmation() {
    const modal = document.querySelector('.order-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function formatPaymentMethod(method) {
    const formats = {
        'credit-card': 'Credit Card',
        'debit-card': 'Debit Card',
        'paypal': 'PayPal',
        'cash': 'Cash on Delivery',
        'apple-pay': 'Apple Pay',
        'google-pay': 'Google Pay'
    };
    return formats[method] || method;
}

function printOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('foodOrders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const itemsList = order.items.map(item => 
        `<tr><td>${item.name}</td><td>$${item.price.toFixed(2)}</td></tr>`
    ).join('');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order Receipt #${orderId}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #28a745; text-align: center; }
                .receipt { border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 0 auto; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #f8f9fa; }
                .total { font-size: 18px; font-weight: bold; color: #28a745; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="receipt">
                <h1>🍕 Food Ordering System</h1>
                <p style="text-align: center;"><strong>Order Receipt</strong></p>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Date:</strong> ${order.timestamp}</p>
                
                <h3>Order Items:</h3>
                <table>
                    <thead>
                        <tr><th>Item</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                        ${itemsList}
                    </tbody>
                </table>
                
                <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
                <p><strong>Delivery Fee:</strong> $${order.deliveryFee.toFixed(2)}</p>
                <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
                <p class="total"><strong>Total: $${order.total.toFixed(2)}</strong></p>
                
                <h3>Delivery Details:</h3>
                <p><strong>Customer:</strong> ${order.customer.name}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
                <p><strong>Address:</strong> ${order.customer.address}</p>
                <p><strong>Payment:</strong> ${formatPaymentMethod(order.customer.payment)}</p>
                
                <div class="footer">
                    <p>Thank you for your order! Estimated delivery: 30-45 minutes</p>
                </div>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

let chatHistory = [];

function initializeChat() {
    const chatForm = document.getElementById('myForm');
    if (!chatForm) return;
    
    chatForm.addEventListener('submit', handleChatSubmit);
}

function handleChatSubmit(e) {
    e.preventDefault();
    
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get bot response
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000 + Math.random() * 2000);
}

function addChatMessage(content, sender = 'user') {
    const chatContainer = document.getElementById('chatMessages');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.style.cssText = `
        margin: 10px 0;
        padding: 10px;
        border-radius: 8px;
        background: ${sender === 'user' ? '#007bff' : '#e9ecef'};
        color: ${sender === 'user' ? 'white' : '#333'};
        max-width: 80%;
        ${sender === 'user' ? 'margin-left: auto;' : ''}
        animation: slideIn 0.3s ease-out;
    `;
    
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-time" style="font-size: 11px; opacity: 0.7; margin-top: 5px;">
            ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'block';
    }
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function getBotResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "👋 Hi there! Welcome to our food ordering system. How can I help you today?";
    }
    
    if (msg.includes('menu') || msg.includes('what do you have')) {
        return "We have:\n🍕 Pizzas\n🍔 Burgers\n🥗 Salads\n🍰 Desserts\n🥤 Drinks\n\nWhich category interests you?";
    }
    
    if (msg.includes('pizza')) {
        return "🍕 Our delicious pizzas:\n• Margherita - $12.99\n• Pepperoni - $14.99\n• Vegetarian - $11.99\n\nAll made with fresh ingredients!";
    }
    
    if (msg.includes('burger') || msg.includes('burgers')) {
        return "🍔 Our mouthwatering burgers:\n• Classic Burger - $9.99\n• Double Cheese - $11.99\n• Spicy Burger - $10.99\n\nWhich one sounds good?";
    }
    
    if (msg.includes('salad')) {
        return "🥗 Fresh and healthy salads:\n• Caesar Salad - $8.99\n• Greek Salad - $9.49\n\nPerfect for a light meal!";
    }
    
    if (msg.includes('dessert') || msg.includes('cake')) {
        return "🍰 Sweet treats:\n• Chocolate Cake - $6.99\n• Cheesecake - $7.99\n\nSave room for dessert!";
    }
    
    if (msg.includes('drink') || msg.includes('beverage')) {
        return "🥤 Refreshing drinks:\n• Coca Cola - $2.99\n• Fresh Orange Juice - $4.99\n\nQuench your thirst!";
    }
    
    if (msg.includes('price') || msg.includes('cost')) {
        return "💰 We have options for every budget:\n• Affordable drinks from $2.99\n• Meals ranging from $8.99 to $14.99\n• Free delivery on orders over $25!";
    }
    
    if (msg.includes('payment') || msg.includes('pay')) {
        return "💳 We accept multiple payment methods:\n✓ Credit Card\n✓ Debit Card\n✓ PayPal\n✓ Cash on Delivery\n✓ Apple Pay\n✓ Google Pay";
    }
    
    if (msg.includes('delivery') || msg.includes('deliver')) {
        return "🚚 Yes, we deliver!\n• Estimated time: 30-45 minutes\n• Free delivery on orders over $25\n• Just provide your address during checkout";
    }
    
    if (msg.includes('order') || msg.includes('how')) {
        return "📦 How to order:\n1. Click 'Add to Order' on items you want\n2. Review your order summary\n3. Fill in your delivery details\n4. Choose payment method\n5. Click 'Place Order'\n\nEasy! 🎉";
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
        return "You're welcome! 😊 Enjoy your meal!";
    }
    
    return "I'm here to help with your order! Try asking about our menu, prices, delivery, or how to place an order. 🍕";
}

function sendQuickMessage(message) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = message;
        const form = document.getElementById('myForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
}

// ============================================
// ANIMATIONS
// ============================================

const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .remove-btn {
        background: #dc3545 !important;
        color: white !important;
        border: none !important;
        padding: 4px 10px !important;
        border-radius: 3px !important;
        cursor: pointer !important;
        font-size: 12px !important;
        transition: background 0.3s !important;
    }
    
    .remove-btn:hover {
        background: #c82333 !important;
    }
`;
document.head.appendChild(animationStyles);

document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('form');

    orderForm.addEventListener('submit', (e) => {
       
        e.preventDefault();

   
        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());

       
        if (data.name.trim().length < 2) {
            alert("Please enter a valid full name.");
            return;
        }

        
        console.log("Order Data Collected:", data);

       
        alert(`Success! Order placed for ${data.name}.\nMethod: ${data.payment}`);

       
        orderForm.reset();
    });

    orderForm.addEventListener('reset', (e) => {
        const confirmClear = confirm("Are you sure you want to clear all fields?");
        if (!confirmClear) {
            e.preventDefault(); 
        }
    });
});
