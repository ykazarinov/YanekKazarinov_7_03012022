class selectFactory{
    constructor(id){
        switch (id) {
            case "ingredients":
                return new ingredientsSelectTemplate(id)
            case "appareil":
                return new appareilSelectTemplate(id)
            case "ustensiles":
                return new ustensilesSelectTemplate(id)
            default:
                throw 'Unknown select type'
        }
    }
}