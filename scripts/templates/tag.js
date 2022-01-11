class tagTemplate{
    constructor(tagData){
        this.filterType = tagData['filterId']
        this.tagValue = tagData['filterItemValue']
        
        this.filterTypes = ['ingredients', 'appareil', 'ustensiles']
    }

    getTagDOM(){
        
        const tag = document.createElement( 'div' )
        tag.classList.add('tag')
        if(this.filterType === this.filterTypes[0]){
            tag.classList.add(this.filterTypes[0])
        }else if(this.filterType === this.filterTypes[1]){
            tag.classList.add(this.filterTypes[1])
        }else if(this.filterType === this.filterTypes[2]){
            tag.classList.add(this.filterTypes[2])
        }
        let tagContent = `
            <div class='tag_content'>${this.tagValue}</div>
            <div class='close'></div>`
        tag.innerHTML = tagContent
        return tag
    }

    closeTag(){
        document.addEventListener('click', (e)=>{
            if(e.target.parentElement.classList.contains('tag')){
                e.target.parentNode.remove()
            }
            

        })
    }
}