# Dokumentation AirBeans DB API
## Om Företaget
### Beskrivning:
Detta anrop används för att hämta information om företaget. Anropet skickas som ett GET-anrop. Om anropet lyckas returneras information om företaget 
### URL: 
GET: http://localhost:1337/about

## Registrera ny användare
### Beskrivning:
Detta anrop används för att registrera en ny användare. Anropet skickas som en POST-förfrågan med JSON-data som innehåller användarens uppgifter. Om man redan är inloggad kommer felmeddelande om att man måste logga ut för att kunna registrera en ny användare att returneras. Om anropet lyckas kommer en ny användare att sparas till databasen och ett success meddelande kommer att returneras med ett meddelande om att användaren är välkommen till flocken. 
### URL:
POST: http://localhost:1337/auth/register
### Body:
{
	"username": "Walther",
 	"password": "Walther123",
  	"email": "mail@mail.se"
}

## Logga in
### Beskrivning:
Detta anrop används för att logga in en användare. Anropet skickas som en POST-förfrågan med JSON-data som innehåller användarens inloggningsuppgifter. Om anropet lyckas så kommer en status 200, success returneras tillsammans med ett meddelande som hälsar användaren välkommen tillbaka. 
### URL:
POST: http://localhost:1337/auth/login
### Body:
{
	"username": "Jesper", 
 	"password": "Jesper123"
}

## Logga ut
### Beskrivning:
Detta anrop används för att logga ut en användaren. Anropet skickas som en POST-förfrågan och om anropat lyckas kommer användaren att loggas ut och ett meddelande om att lyckad utlopggning kommer att returneras.  
### URL:
POST: http://localhost:1337/auth/logout

## Hämta menyn
### Beskrivning
Detta anrop används för att hämta menyn och se vad man kan köpa och till vilket pris. Anropet skickas som ett GET-anrop och om anropet lyckas kommer alla produkter som finns tillgänliga i databasen returneras.
### URL
GET: http://localhost:1337/menu

## Lägg till en ny produkt till menyn
### Beskrivning
Detta anrop används för att lägga till en ny produkt till menyn. Anropet skickas som en POST-förfrågan med JSON-data som innehåller titel på produkten, tillsammans med en beskrivning och ett pris. Användaren måste vara inloggad som admin för att kunna lägga till en ny produkt till menyn, annars kommer de ej att ha åtkomst till begärd sida. Vid lyckat anrop kommer produkten att läggas till i databasen och produkten kommer att returneras med ett id, title, beskrivning, pris och en tidpunkt för när produkten lades till på menyn. 
### URL: 
POST: http://localhost:1337/menu/add
### Body:
{
	"title": "Morotskaka",
 	"desc": "beskrivning",
	"price": "37"
}

## Radera en produkt från menyn
### Beskrivning:
Detta anrop används för att radera en produkt från databasen (meny). Anropet skickas som en DELETE-förfråan. Om anropet lyckas kommer produkten att raderas från databasen och en success kommer att returneras tillsammans med en kopia på produkten som precis raderades. 
### URL:
DELETE: http://localhost:1337/menu/id
### Query Parametrar:
id: Id på produkten som man vill radera, i detta fall är det siffror. 

## Redigera en produkt på menyn
### Beskrivning:
Detta anrop används för att redigera en produkt på menyn. Anropet skickas som en PUT-förfrågan med JSON-data som innehåller titel, beskrivning och pris. Om anropet lyckas kommer en success att returneras tillsammans med produkten som precis har redigerats.
### URL: 
PUT: http://localhost:1337/menu/id
### Quary Parametrar:
id: Id på produkten som man vill redigera, i detta fallet är id en siffra
### Body:
{
	"title": "Tårta ",
	"desc": "beskrivning av en tårta",
	"price": "56"
}

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

