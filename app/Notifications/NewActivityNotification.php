<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Broadcasting\Channel;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;
use Carbon\Carbon;

class NewActivityNotification extends Notification implements ShouldBroadcastNow
{
    use Queueable;

    public $activity; // Menyimpan objek Event, Schedule, atau Announcement

    public function __construct($activity)
    {
        $this->activity = $activity;
    }

    /**
     * Menentukan via apa notifikasi akan dikirim.
     */
    public function via($notifiable): array
    {
        // Kirim ke database, siarkan ke lonceng, dan kirim sebagai push notification
        return ['database', 'broadcast', WebPushChannel::class];
    }
    
    /**
     * Menentukan channel publik untuk siaran (untuk toast/lonceng).
     */
    public function broadcastOn(): array
    {
        return [new Channel('public-activities')];
    }
    
    /**
     * Mendefinisikan nama event siaran kustom.
     */
    public function broadcastAs(): string
    {
        return 'NewActivityNotification';
    }

    /**
     * Format notifikasi yang akan disiarkan ke frontend (lonceng/toast).
     */
    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
    
    /**
     * Format notifikasi yang akan dikirim sebagai Push Notification.
     */
    public function toWebPush($notifiable, $notification)
    {
        $type = $this->getActivityType();
        $message = "{$type}: {$this->activity->title}";

        return (new WebPushMessage)
            ->title('Aktivitas Baru di Starlabs!')
            ->icon('/images/icon.png') // Pastikan path ini benar di folder public
            ->body($message)
            ->action('Lihat Sekarang', 'view_activity');
    }
    
    /**
     * Format notifikasi yang akan disimpan di database.
     */
    public function toDatabase($notifiable): array
    {
        return $this->toArray($notifiable);
    }
    
    /**
     * Mengembalikan array data notifikasi yang terstruktur.
     */
    public function toArray($notifiable): array
    {
        $type = $this->getActivityType();

        return [
            'type' => $type,
            'title' => $this->activity->title,
            'activity_type' => get_class($this->activity),
            'activity_id' => $this->activity->id,
            'created_at_human' => Carbon::now()->diffForHumans(),
        ];
    }

    /**
     * Helper untuk menentukan tipe aktivitas.
     */
    private function getActivityType(): string
    {
        if ($this->activity instanceof \App\Models\Event) {
            return 'Event Baru';
        }
        if ($this->activity instanceof \App\Models\Schedule) {
            return 'Jadwal Baru';
        }
        if ($this->activity instanceof \App\Models\Announcement) {
            return 'Pengumuman Baru';
        }
        return 'Aktivitas Baru';
    }
}

