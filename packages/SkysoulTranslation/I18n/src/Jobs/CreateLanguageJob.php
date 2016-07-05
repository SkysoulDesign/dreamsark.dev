<?php

namespace SkysoulDesign\I18n\Jobs;

use SkysoulDesign\I18n\Repositories\TranslationRepositoryInterface;

class CreateLanguageJob extends Job
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
*@param \SkysoulDesign\I18n\Repositories\TranslationRepositoryInterface $repository
     * @return \SkysoulDesign\I18n\Models\Language
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->createLanguage($this->name);
    }

}
