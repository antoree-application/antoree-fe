# Teachers Search API

## Endpoint
`GET /api/teachers/search`

## Description
Search and filter teachers based on various criteria with pagination and sorting capabilities.

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search in teacher's bio, specialties, languages, and full name |
| `minRating` | number | - | Filter teachers with minimum average rating |
| `page` | number | 1 | Page number for pagination (must be ≥ 1) |
| `limit` | number | 10 | Number of teachers per page (1-100) |
| `sortBy` | string | 'averageRating' | Field to sort by: 'averageRating', 'hourlyRate', 'experience', 'totalLessons', etc. |
| `sortOrder` | string | 'desc' | Sort order: 'asc' or 'desc' |

## Example Request
```
GET /api/teachers/search?search=English&minRating=4&page=1&limit=10&sortBy=averageRating&sortOrder=desc
```

## Response Format
```json
{
  "statusCode": 200,
  "message": "",
  "data": {
    "teachers": [
      {
        "id": "teacher_001",
        "bio": "Experienced English teacher with 8 years of teaching experience. Specialized in business English and IELTS preparation.",
        "experience": 8,
        "education": "Master of Arts in TESOL, University of Cambridge",
        "certifications": [
          "TEFL Certificate",
          "IELTS Teaching Certificate",
          "Cambridge CELTA"
        ],
        "specialties": [
          "Business English",
          "IELTS Preparation",
          "Conversational English"
        ],
        "hourlyRate": "25",
        "timezone": "Asia/Ho_Chi_Minh",
        "languages": [
          "English (Native)",
          "Vietnamese (Intermediate)"
        ],
        "videoIntroUrl": "https://example.com/intro/emily.mp4",
        "status": "APPROVED",
        "totalLessons": 1,
        "averageRating": "5",
        "responseTime": 30,
        "profileCompleted": true,
        "verificationSubmitted": true,
        "availabilitySetup": true,
        "isLive": true,
        "advanceNoticeHours": 24,
        "maxAdvanceBookingHours": 720,
        "allowInstantBooking": true,
        "bookingInstructions": "Please let me know your current English level and learning goals before our first lesson.",
        "createdAt": "2025-08-22T05:54:51.573Z",
        "updatedAt": "2025-08-22T05:54:51.573Z",
        "fullName": "Emily Johnson",
        "email": "emily.johnson@antoree.com",
        "avatar": "https://randomuser.me/api/portraits/women/10.jpg",
        "phone": "+84901234573",
        "isActive": true,
        "availableDays": [1, 2, 3, 4, 5, 6],
        "trialLessonRate": "12.5",
        "regularLessonRate": "25",
        "recentReviews": [
          {
            "id": "cmemf1oy90062ysmgdn3o6gd7",
            "rating": 5,
            "comment": "Emily's business English course is exactly what I needed. Professional, well-structured, and very practical.",
            "createdAt": "2025-08-20T05:54:51.919Z",
            "studentName": "Mike Wilson",
            "studentAvatar": "https://randomuser.me/api/portraits/men/3.jpg"
          }
        ],
        "totalReviews": 1
      }
    ],
    "total": 3,
    "page": 1,
    "limit": 1,
    "totalPages": 3
  }
}
```

## Response Fields

### Teacher Object
- `id`: Unique teacher identifier
- `bio`: Teacher's biography and description
- `experience`: Years of teaching experience
- `education`: Educational background
- `certifications`: Array of teaching certifications
- `specialties`: Array of teaching specialties
- `hourlyRate`: Teacher's hourly rate as string
- `timezone`: Teacher's timezone
- `languages`: Array of languages spoken
- `averageRating`: Average rating from student reviews
- `totalReviews`: Total number of reviews received
- `recentReviews`: Array of recent student reviews
- `fullName`: Teacher's full name
- `avatar`: Profile picture URL
- And many more fields...

### Pagination Object
- `total`: Total number of teachers matching the search criteria
- `page`: Current page number
- `limit`: Number of teachers per page
- `totalPages`: Total number of pages

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Page must be greater than 0"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Usage Examples

### Search for English teachers with high ratings
```
GET /api/teachers/search?search=English&minRating=4
```

### Get teachers sorted by price (low to high)
```
GET /api/teachers/search?sortBy=hourlyRate&sortOrder=asc
```

### Get second page with 5 teachers per page
```
GET /api/teachers/search?page=2&limit=5
```

### Search for French teachers with experience sorting
```
GET /api/teachers/search?search=French&sortBy=experience&sortOrder=desc
```

## Frontend Integration

The API client is available in `/lib/api.ts`:

```typescript
import { api } from '@/lib/api'

// Search teachers
const response = await api.teachers.search({
  search: 'English',
  minRating: 4,
  page: 1,
  limit: 10,
  sortBy: 'averageRating',
  sortOrder: 'desc'
})

const teachersData = response.data
```

## Notes

- All query parameters are optional
- The search is case-insensitive and searches across multiple fields
- Pagination starts from page 1
- Limit is capped at 100 teachers per page
- The API uses mock data for demonstration purposes
