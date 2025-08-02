// Format dates for display
export const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const formatDateTime = (date: Date | string) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};