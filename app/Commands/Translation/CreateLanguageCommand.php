<?php

namespace DreamsArk\Commands\Translation;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class CreateLanguageCommand extends Command implements SelfHandling
{
    /**
     * Create a new command instance.
     *
     * @param $name
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Execute the command.
     *
     * @param TranslationRepositoryInterface $repository
     * @return \DreamsArk\Models\Translation\Language
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->createLanguage($this->name);
    }

}
