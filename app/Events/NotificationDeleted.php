<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationDeleted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $notification_id;

    /**
     * Create a new event instance.
     */
    public function __construct(string $notificationId)
    {
        $this->notification_id = $notificationId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [new Channel('public-activity-deletions')];
    }

    /**
     * The name of the event listener to broadcast.
     */
    public function broadcastAs(): string
    {
        return 'ActivityDeleted';
    }
}

