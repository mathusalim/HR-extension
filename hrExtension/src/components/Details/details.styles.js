export const DetailsStyles = {
    detailsWrapper: () => ({ padding: '1rem' }),
    saveDisclaimer: () => ({
        color: '#F806CC',
        fontWeight: 'bold',
        letterSpacing: '0.05rem',
    }),
    disclaimerWrapper: () => ({
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    }),
    detailsButtonWrapper: () => ({
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
    }),
    detailsButton: () => ({ color: '#03c4a1' }),
    formContainer: () => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        backgroundColor: '#03c4a1',
        color: '#242424',
        padding: '1rem',
    }),
    formGroupRow: (alignCenter = true) => ({
        display: 'flex',
        alignItems: alignCenter ? 'center' : 'start',
        width: '100%',
        justifyContent: 'start',
        gap: '2rem',
    }),
    formGroup: (stretch = false) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: stretch ? 'stretch' : 'start',
        flex: '1',
    }),
    formInput: () => ({ width: '100%' }),
}
