<?php

namespace SkysoulDesign\Translation\Events;

use Illuminate\Queue\SerializesModels;
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
