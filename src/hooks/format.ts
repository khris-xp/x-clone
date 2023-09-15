export function formatDateDifference(dateString: string): string {
    const currentDate = new Date();
    const targetDate = new Date(dateString);

    const timeDifference = Math.abs(targetDate.getTime() - currentDate.getTime());

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let formattedDate = '';
    if (days === 0 && hours === 0) {
        formattedDate = `${minutes}min`;
    } else if (days === 0 && hours === 0 && minutes === 0) {
        formattedDate = `now`;
    } else if (days > 0) {
        formattedDate = `${days}d`;
    } else if (days === 0 && hours > 0) {
        formattedDate = `${hours}hr`;
    } else if (days === 0 && hours === 0 && minutes > 0) {
        formattedDate = `${minutes}min`;
    }

    return formattedDate;
}

export function formatJoinedDate(date: string) {
    const inputDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate;
}