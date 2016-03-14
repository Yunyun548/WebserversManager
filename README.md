# ServersManager

Server Manager est une application crée à l'aide du framework MVC SailsJs permettant de :
  - Gérer les serveurs en location auprès des hébergeurs OVH, Kimsufi et SoYouStart
  - Gérer les contrats d'hébergement clients sur ces serveurs
  - Consulter la cahrge d'utilisation des serveurs en gestion

## Version
0.0.1

## Tech

ServersManager utilise les technologies suivantes

> * [SailsJs] - Framework MVC pour Node.js
> * [Gentellela] - Template admin (awesome and free !)
> * [MongoDB] - Mais rien ne vous empêche d'utiliser autre chose !

### Installation

Cloner le répertoire depuis github :

```sh
$ git clone git@github.com:Yunyun548/WebserversManager.git WebserversManager
```

Installer les dépendances :
```sh
$ cd WebserversManager
$ npm install
```
Créer une base de données et le fichier `config/connection.js` sur la base du fichier `config/connection.js.dist`. Si vous ne souhaitez pas vous embêter avec une base externe, vous pouvez choisir d'utiliser `localDiskDb`. Dans ce cas, le fichier `connections.js` sera tel que :
```sh
module.exports.connections = {
    localDiskDb: {
        adapter: 'sails-disk'
    }
}
```
Lancer le projet :
```sh
$ sails lift
```

### Dévelopment

Si vous souhaitez amender le projet, n'hésitez pas à créer une pull request.
