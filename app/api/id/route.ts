import { NextRequest, NextResponse } from 'next/server';
import { getTaskById } from '@/lib/task';
import { ApiResponse } from '@/types/api-todo';

// Definisikan Tipe Parameter Dinamis (RouteContext)
type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// Ekstrak Parameter ID dari URL
export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  // Ambil Data dan Tangani Skenario Tidak Ditemukan (404)
  try {
    const task = await getTaskById(id);

    if (!task) {
      const notFoundPayload: ApiResponse = {
        success: false,
        message: `Task dengan ID ${id} tidak ditemukan di DummyJSON.`,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(notFoundPayload, { status: 404 });
    }
    const successPayload: ApiResponse = {
      success: true,
      message: `Detail Task ID ${id} berhasil diambil.`,
      data: task,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(successPayload, { status: 200 });
  } catch (error) {
    // Tangani Error Server (500)
    return NextResponse.json(
      {
        success: false,
        message: `Gagal mengambil Task ID ${id}.`,
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}