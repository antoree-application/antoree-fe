import { useApi, useMutation } from "./useApi"
import { api } from "@/lib/api"
import type { Teacher, Review, SearchFilters, ContactForm } from "@/types/api"

// Teachers hooks
export function useTeachers(filters?: SearchFilters) {
  return useApi<Teacher[]>(() => api.teachers.search(filters || {}), { immediate: true })
}

export function useTeacher(id: string) {
  return useApi<Teacher>(() => api.teachers.getById(id), { immediate: !!id })
}

// Reviews hooks
export function useReviews(page = 1, limit = 10) {
  return useApi<Review[]>(() => api.reviews.getAll(page, limit), { immediate: true })
}

export function useTeacherReviews(teacherId: string) {
  return useApi<Review[]>(() => api.reviews.getByTeacher(teacherId), { immediate: !!teacherId })
}

// Mutation hooks
export function useCreateReview() {
  return useMutation(api.reviews.create)
}

export function useContactForm() {
  return useMutation<any, ContactForm>(api.contact.submit)
}

export function useLogin() {
  return useMutation(api.auth.login)
}

export function useRegister() {
  return useMutation(api.auth.register)
}
