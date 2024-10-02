function capitalizeFirstLetter(word: string): string {
    if (!word) return ''; // Handle empty strings
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const measurePrettier = (measure: string): string => {
    return measure
        .split("_")
        .map((word: string) => capitalizeFirstLetter(word))
        .join(" ");
}

const makeCustomIdentifier = (name: string): string => {
    return name.split(" ").join("_").toLowerCase();
}

function fix_date(days: number, x: number) {
    const date = new Date();
    
    // Calculate the new date
    date.setDate(date.getDate() - (days - x));

    // Get the components of the date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    // Format the fixed date
    const fixed_date = `${year}-${month}-${day}`;

    return fixed_date;
}

// Example usage
console.log(fix_date(10, 3)); // Output: "YYYY-MM-DD" format



export {fix_date ,capitalizeFirstLetter, measurePrettier,makeCustomIdentifier}