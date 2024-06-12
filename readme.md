# Dokumentation AirBeans DB API
## Om Företaget
### Beskrivning:
Detta anrop används för att hämta information om företaget. Anropet skickas som ett GET-anrop. Om anropet lyckas returneras information om företaget 
### URL: 
GET: http://localhost:1337/about

## Registrera ny användare
### Beskrivning:
### URL:
POST: http://localhost:1337/auth/register

## Logga in
### Beskrivning:
### URL:
POST: http://localhost:1337/auth/login


## Logga ut
### Beskrivning:
### URL:
POST: http://localhost:1337/auth/logout

## Hämta menyn
### Beskrivning
### URL
GET: http://localhost:1337/menu

## Lägg till en ny produkt till menyn
### Beskrivning
### URL: 
### Body:

## Radera en produkt från menyn
### Beskrivning:
### URL:
### Body:

## Redigera en produkt på menyn
### Beskrivning:
### URL:
### Body:

## Lägg till produkt till varukorgen
### Beskrivning
### URL:
POST: http://localhost:1337/cart/1
### Query Parametrar

## Ta bort en produkt från varukorgen
### Beskrivning
### URL
DELETE: http://localhost:1337/cart/1
### Query Parametrar

## Hämta varukorgen
### Beskrivning
### URL: 
GET http://localhost:1337/cart 

## Lägg en beställning
### Beskrivning
### URL:
POST: http://localhost:1337/orders

## Se orderbekräftelse
### Beskrvning
### URL:
GET: http://localhost:1337/orders/status


## Hämta orderhistorik
### Beskrivning
### URL:
POST: http://localhost:1337/orders/user


## Hämta alla Promotions 
### Beskrivning
### URL:
GET: http://localhost:1337/promotions

## Lägg till ny promotion
### Beskrivning
### URL

