<?php

namespace DreamsArk\Events\Translation;

use DreamsArk\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Collection;

class TranslationsWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Collection
     */
    public $translations;

    /**
     * Create a new event instance.
     *
     * @param Collection $translations
     */
    public function __construct(Collection $translations)
    {
        $this->translations = $translations;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
