document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('quoteForm');
  const messages = document.getElementById('messages');
  const result = document.getElementById('result');

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    messages.textContent = '';
    result.hidden = true;

    const name = document.getElementById('name').value.trim();
    const weightVal = document.getElementById('weight').value;
    const distanceVal = document.getElementById('distance').value;
    const code = document.getElementById('code').value.trim().toUpperCase();

    
    const weight = parseFloat(weightVal);
    const distance = parseInt(distanceVal, 10);

    if(!name){
      messages.textContent = 'El nombre del cliente es obligatorio.';
      return;
    }
    if(isNaN(weight) || weight <= 0){
      messages.textContent = 'Ingrese un peso válido mayor que 0.';
      return;
    }
    if(isNaN(distance) || distance <= 0){
      messages.textContent = 'Ingrese un valor mayor a 0.';
      return;
    }

    const costoPeso = weight * 2.0;
    const costoDistancia = distance * 0.05;
    const subtotal = costoPeso + costoDistancia;

    let discountPercent = 0;
    let discountText = 'No aplicado';
    let invalidCodeMsg = '';

    if(code){
      if(code === 'WEB10'){
        discountPercent = 0.10;
        discountText = '10%';
      } else if(code === 'WEB20'){
        discountPercent = 0.20;
        discountText = '20%';
      } else {
        invalidCodeMsg = 'Código no válido, no se aplicó descuento.';
        discountText = 'No válido';
      }
    }

    const totalConDescuento = subtotal * (1 - discountPercent);
    const impuesto = totalConDescuento * 0.08;
    const total = totalConDescuento + impuesto;

    document.getElementById('rName').textContent = name;
    document.getElementById('rPeso').textContent = costoPeso.toFixed(2);
    document.getElementById('rDist').textContent = costoDistancia.toFixed(2);
    document.getElementById('rSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('rDescuento').textContent = discountText + (discountPercent>0 ? ` (-$${(subtotal*discountPercent).toFixed(2)})` : '');
    document.getElementById('rImpuesto').textContent = impuesto.toFixed(2);
    document.getElementById('rTotal').textContent = total.toFixed(2);

    if(invalidCodeMsg){
      messages.textContent = invalidCodeMsg;
    }

    result.hidden = false;
  });
});
