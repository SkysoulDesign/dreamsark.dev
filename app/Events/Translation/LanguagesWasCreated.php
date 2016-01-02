<?php

namespace DreamsArk\Events\Translation;

use DreamsArk\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Collection;

class LanguagesWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Collection
     */
    public $languages;

    /**
     * Create a new event instance.
     *
     * @param Collection $languages
     */
    public function __construct(Collection $languages)
    {
        $this->languages = $languages;
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
