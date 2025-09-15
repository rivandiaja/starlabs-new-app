<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Broadcasting\Channel;

class ActivityDeletedNotification extends Notification implements ShouldBroadcastNow
{
    use Queueable;

    public string $notificationId;

    public function __construct(string $notificationId)
    {
        $this->notificationId = $notificationId;
    }

    public function via($notifiable): array
    {
        return ['broadcast']; // Hanya disiarkan
    }

    /**
     * Menentukan channel publik untuk siaran notifikasi penghapusan.
     */
    public function broadcastOn(): array
    {
        return [new Channel('public-activity-deletions')];
    }

    /**
     * Mendefinisikan nama event siaran kustom.
     */
    public function broadcastAs(): string
    {
        return 'ActivityDeleted';
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'notification_id' => $this->notificationId,
        ]);
    }
}
