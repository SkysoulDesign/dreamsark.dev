<?php

namespace SkysoulDesign\Translation\Jobs;

use SkysoulDesign\Translation\Models\Language;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

/**
 * Class CreateTranslationJob
 *
 * @package SkysoulDesign\Translation\Jobs
 */
class CreateTranslationJob extends Job
{
    /**
     * @var string
     */
    private $group_id;

    /**
     * @var array
     */
    private $translation;

    /**
     * @var string
     */
    private $language_id;

    /**
     * Create a new command instance.
     *
     * @param int $language_id
     * @param int $group_id
     * @param array $translation
     */
    public function __construct($language_id, $group_id, array $translation)
    {
        $this->translation = $translation;
        $this->group_id = $group_id;
        $this->language_id = $language_id;
    }

    /**
     * Execute the command.
     *
     * @param TranslationRepositoryInterface $repository
     * @return Language
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->createTranslation(
            $this->language_id, $this->group_id, $this->translation
        );
    }

}
