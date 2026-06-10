export type PostDateInput = string | Date;

function makeUtcDate(year: number, month: number, day: number): Date | null {
    const date = new Date(Date.UTC(year, month - 1, day));

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        return null;
    }

    return date;
}

export function parsePostDate(input: PostDateInput): Date | null {
    if (input instanceof Date) {
        if (Number.isNaN(input.getTime())) {
            return null;
        }

        return makeUtcDate(input.getFullYear(), input.getMonth() + 1, input.getDate());
    }

    const value = String(input).trim();
    const indianMatch = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

    if (indianMatch) {
        const [, day, month, year] = indianMatch;
        return makeUtcDate(Number(year), Number(month), Number(day));
    }

    const isoMatch = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

    if (isoMatch) {
        const [, year, month, day] = isoMatch;
        return makeUtcDate(Number(year), Number(month), Number(day));
    }

    const fallback = new Date(value);

    if (Number.isNaN(fallback.getTime())) {
        return null;
    }

    return makeUtcDate(fallback.getFullYear(), fallback.getMonth() + 1, fallback.getDate());
}

export function formatPostDate(input: PostDateInput, month: 'short' | 'long' = 'short'): string {
    const date = parsePostDate(input);

    if (!date) {
        return 'Invalid Date';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month,
        year: 'numeric',
        timeZone: 'UTC',
    }).format(date);
}

export function toIndianDateString(input: PostDateInput): string {
    const date = parsePostDate(input);

    if (!date) {
        return String(input);
    }

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

export function toIsoDateString(input: PostDateInput): string {
    const date = parsePostDate(input);

    if (!date) {
        return String(input);
    }

    return date.toISOString().slice(0, 10);
}

export function toRssDateString(input: PostDateInput): string {
    const date = parsePostDate(input);

    if (!date) {
        return new Date(0).toUTCString();
    }

    return date.toUTCString();
}
