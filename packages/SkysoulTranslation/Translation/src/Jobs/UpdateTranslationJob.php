<?php

namespace SkysoulDesign\Translation\Jobs;

use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

class UpdateTranslationJob extends Job
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
     * @return bool|mixed
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->update($this->translation_id, $this->fields);
    }
}
