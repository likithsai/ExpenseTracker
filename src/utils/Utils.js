const Utils = {
    dateFormatter : (date) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    },
    formatDate : (date) => {
        var d = new Date(date)
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = d.getFullYear()

        if (month.length < 2) 
            month = '0' + month

        if (day.length < 2) 
            day = '0' + day

        return [year, month, day].join('-')
    }
}

export default Utils