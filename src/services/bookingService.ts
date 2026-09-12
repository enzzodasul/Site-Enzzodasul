import { BookingRequest } from '../types';

export const bookingService = {
  async submitBookingRequest(data: BookingRequest): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Booking request submitted:', data);
    return {
      success: true,
      message: 'Solicitação de show enviada com sucesso! Nossa equipe de booking entrará em contato em breve.',
    };
  },
};
