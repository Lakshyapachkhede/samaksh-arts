export const utcToIstReadable = (utcString) => {

    // Parse the UTC string to a Date object
    const utcDate = new Date(utcString);

    // Format directly using timeZone 'Asia/Kolkata' (IST)
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
    };

    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(utcDate);

    return `${formattedDate} IST`;

};