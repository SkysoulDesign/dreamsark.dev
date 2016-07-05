<?php

namespace SkysoulDesign\Translation\Events;

use Illuminate\Queue\SerializesModels;
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
