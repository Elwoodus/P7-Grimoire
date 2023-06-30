Pour lancer le projet il faut installer node modules avec un "npm install"

Il est préférable également d'installer toutes ces dépendances : 

"bcrypt"
"cors"
"dotenv"
"express" 
"jsonwebtoken" 
"mongoose"
"multer"

Enfin pour lancer le projet taper : "npm run dev" 

Si vous voulez faire une multitude de test et en suite supprimer les livres je  vous conseil cette ligne de code : 

Book.deleteMany({}).then(() => {
    console.log("Books deleted")
}); 

Enjoy