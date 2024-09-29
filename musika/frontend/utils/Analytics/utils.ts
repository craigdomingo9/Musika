function capitalizeFirstLetter(word: string): string {
    if (!word) return ''; // Handle empty strings
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const measurePrettier = (measure: string) => {
    return measure.split("_").map((word: any) => word = capitalizeFirstLetter(word)).join(" ")
}

const makeCustomIdentifier = (name: string) : string => {
    return name.split(" ").join("_").toLowerCase()
  }

function fix_date(days: number,x:number){
    const date = new Date()

    date.setDate(date.getDate() - (days - x))

    const temp_date = date.toLocaleDateString()

    const day = Number(temp_date.split("/")[1])
    const month = Number(temp_date.split("/")[0])
    const year = Number(temp_date.split("/")[2])

    const fixed_date = `${year}-${month<10?0:""}${month}-${day<10?0:""}${day}`
    
    return fixed_date
}



export {fix_date ,capitalizeFirstLetter, measurePrettier,makeCustomIdentifier}