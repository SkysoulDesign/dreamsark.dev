<?php

namespace SkysoulDesign\Translation\Jobs;

use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

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
     * @param \SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface $repository
     * @return \SkysoulDesign\Translation\Models\Language
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->createLanguage($this->name);
    }

}
