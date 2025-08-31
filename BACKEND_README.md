# MESM Backend

This backend implementation provides comprehensive API endpoints for the Melbourne eScooter Mechanics application.

## API Endpoints

### Sales Data
- **GET** `/api/sales` - Returns recent sales transactions
- Response includes customer info (name, email, avatar, initials) and transaction amounts
- Sorted by creation date (most recent first)

### Revenue Data  
- **GET** `/api/revenue` - Returns monthly revenue data for charts
- Used by the admin dashboard Overview chart

### Service Bookings
- **GET** `/api/bookings` - Returns service bookings
- **Query Parameters:**
  - `status` - Filter by booking status (`pending`, `in-progress`, `completed`, `cancelled`)
- Sorted by creation date (most recent first)

### Technicians
- **GET** `/api/technicians` - Returns technician information
- **Query Parameters:**
  - `status` - Filter by availability (`available`, `busy`, `offline`)
  - `specialization` - Filter by specialization (partial match)
- Sorted by rating (highest first)

### Scooters for Sale
- **GET** `/api/scooters` - Returns refurbished scooters for sale
- **Query Parameters:**
  - `inStock` - Filter by stock status (`true`, `false`)
  - `brand` - Filter by brand (partial match)
  - `maxPrice` - Filter by maximum price
- Sorted by price (lowest first)

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

### Bookings
```json
{
  "id": "string",
  "customerName": "string",
  "customerEmail": "string",
  "phoneNumber": "string", 
  "scooterBrand": "string",
  "scooterModel": "string",
  "issueDescription": "string",
  "serviceType": "repair|maintenance|upgrade",
  "status": "pending|in-progress|completed|cancelled",
  "location": "string",
  "scheduledDate": "string (ISO date)",
  "estimatedCost": "number",
  "createdAt": "string (ISO date)"
}
```

### Technicians
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "specialization": "string",
  "experience": "string", 
  "rating": "number",
  "status": "available|busy|offline",
  "location": "string",
  "avatarUrl": "string|null",
  "completedJobs": "number",
  "createdAt": "string (ISO date)"
}
```

### Scooters
```json
{
  "id": "string",
  "brand": "string",
  "model": "string",
  "year": "number",
  "condition": "excellent|very good|good|fair",
  "price": "number",
  "originalPrice": "number", 
  "description": "string",
  "features": "string[]",
  "imageUrl": "string|null",
  "inStock": "boolean",
  "mileage": "number",
  "warranty": "string",
  "createdAt": "string (ISO date)"
}
```

## API Usage Examples

### Get Available Technicians
```bash
curl "http://localhost:3000/api/technicians?status=available"
```

### Get Pending Bookings
```bash
curl "http://localhost:3000/api/bookings?status=pending"
```

### Get In-Stock Scooters Under $700
```bash
curl "http://localhost:3000/api/scooters?inStock=true&maxPrice=700"
```

### Get Battery Specialists
```bash
curl "http://localhost:3000/api/technicians?specialization=battery"
```

## Implementation Details

- **Storage**: JSON files in `src/data/` directory
- **API Routes**: Next.js App Router API routes in `src/app/api/`
- **Type Safety**: TypeScript interfaces in `src/types/api.ts`
- **Frontend Hook**: Custom `useApi` hook for data fetching with loading states
- **Error Handling**: Proper error responses and loading states in components
- **Query Parameters**: Flexible filtering and sorting options

## Features

✅ **Complete Data Organization**: All hardcoded data moved to structured JSON files  
✅ **RESTful API Design**: Clean, consistent API endpoints  
✅ **Query Parameters**: Flexible filtering and sorting  
✅ **Type Safety**: Full TypeScript support  
✅ **Error Handling**: Graceful error responses  
✅ **Loading States**: Smooth UX with loading indicators  
✅ **Data Validation**: Input validation and sanitization  

## Future Enhancements

- Database integration (PostgreSQL/MySQL with Prisma)
- Authentication and authorization (JWT tokens)
- Real-time updates (WebSocket/Server-Sent Events)
- File uploads (scooter images, documents)
- Advanced search and filtering
- API rate limiting and caching
- Pagination for large datasets
- Audit logging and data history
- Automated testing suite
- API documentation with Swagger/OpenAPI