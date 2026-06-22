# Frontend2 API Integration - Complete Setup ✅

## ✅ Installed & Configured

- **React Query** - Server state management
- **Axios** - HTTP client with JWT interceptor
- **Auth Context** - User session management
- **API Hooks** - Pre-built React Query hooks

## 📁 API Integration Files Created

```
Frontend2/
├── lib/api/
│   ├── axios.ts            # HTTP client with JWT interceptor
│   ├── types.ts            # API types (Property, Auth, etc.)
│   └── helpers.ts          # Utility functions
├── hooks/
│   ├── useAuth.tsx         # Auth context & login state
│   └── useApi.ts           # React Query hooks for API
├── app/
│   ├── layout.tsx          # Updated with Providers
│   ├── providers.tsx       # React Query + Auth providers
│   ├── login/
│   │   └── page.tsx        # OTP login page
│   └── page.tsx            # Home page
├── .env.local              # API config (already set)
└── package.json            # Updated with dependencies
```

## 🎯 Ready to Use

### 1. Authentication (OTP Flow)
```tsx
const { login } = useAuth()
// Send OTP → Verify OTP → Auto-login
```

### 2. Fetch Properties
```tsx
import { useProperties } from '@/hooks/useApi'

export function PropertyList() {
  const { data: properties, isLoading } = useProperties()
  // Render properties
}
```

### 3. Create/Update/Delete Properties
```tsx
const { mutate: createProperty } = useCreateProperty()
createProperty({ title: '...', price: 5000000, ... })
```

## 🚀 Quick Start

**1. Start dev server:**
```bash
cd Frontend2
npm run dev
```

**2. Test login flow:**
- Visit http://localhost:3000/login
- Enter mobile number
- Verify OTP from backend

**3. Use API hooks:**
All React Query hooks ready in `/hooks/useApi.ts`

## 📝 API Endpoints Configured

- `POST /auth/send-otp` - Send OTP to mobile
- `POST /auth/verify-otp` - Verify OTP & login
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get single property
- `POST /properties` - Create property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

## 🔐 JWT Token Management

- Automatically added to all requests
- Auto-removed on 401 response
- Stored in localStorage

## 🎨 UI Generation with v0.dev

Frontend2 already has shadcn/ui components installed. You can now:

1. Generate pages in v0.dev
2. Copy code to `/app` folder
3. Replace dummy data with React Query hooks
4. All API calls ready to use

## 📌 Next Steps

1. **Test the API integration:**
   ```bash
   # Use the API testing files in root
   node api-client.js interactive
   ```

2. **Generate UI pages in v0.dev**
   - Property listing page
   - Property details page
   - Create property form

3. **Integrate v0 pages:**
   - Copy generated code to `/app`
   - Replace hardcoded data with React Query hooks
   - Use existing components from `@/components/ui`

4. **Add Mapbox integration** (optional)
   - Token ready in `.env.local`

## ✨ Features Ready

✅ OTP-based authentication
✅ React Query state management  
✅ JWT auto-interceptor
✅ API hooks for CRUD operations
✅ Error handling
✅ Loading states
✅ Full TypeScript support
✅ shadcn/ui components

---

Everything is ready! Start building your UI pages in v0.dev and integrate them here.
