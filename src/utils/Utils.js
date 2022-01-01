const Utils = {
    dateFormatter : (date) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }
}

export default Utils