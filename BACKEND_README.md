# MESM Backend

This backend implementation provides API endpoints for the Melbourne eScooter Mechanics application.

## API Endpoints

### Sales Data
- **GET** `/api/sales` - Returns recent sales transactions
- Response includes customer info (name, email, avatar, initials) and transaction amounts
- Sorted by creation date (most recent first)

### Revenue Data  
- **GET** `/api/revenue` - Returns monthly revenue data for charts
- Used by the admin dashboard Overview chart

## Data Structure

### Sales
```json
{
  "id": "string",
  "name": "string", 
  "email": "string",
  "avatarUrl": "string|null",
  "initials": "string",
  "amount": "number",
  "createdAt": "string (ISO date)"
}
```

### Revenue
```json
{
  "month": "string",
  "total": "number"
}
```

## Implementation Details

- **Storage**: JSON files in `src/data/` directory
- **API Routes**: Next.js App Router API routes in `src/app/api/`
- **Type Safety**: TypeScript interfaces in `src/types/api.ts`
- **Frontend Hook**: Custom `useApi` hook for data fetching with loading states
- **Error Handling**: Proper error responses and loading states in components

## Future Enhancements

- Database integration (PostgreSQL/MySQL)
- Authentication and authorization
- Real-time updates
- Data validation and sanitization
- API rate limiting
- Pagination for large datasets