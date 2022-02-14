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
    },
    formatBytes : (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

export default Utils