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

export default fix_date