<?php

namespace DreamsArk\Commands\Translation;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class UpdateTranslationCommand extends Command implements SelfHandling
{
    /**
     * @var
     */
    private $translation_id;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param $translation_id
     * @param array $fields
     */
    public function __construct($translation_id, array $fields)
    {
        $this->translation_id = $translation_id;
        $this->fields = $fields;
    }

    /**
     * Execute the command.
     *
     * @param TranslationRepositoryInterface $repository
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->update($this->translation_id, $this->fields);
    }
}
