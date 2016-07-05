<?php

namespace SkysoulDesign\Translation\Repositories;

use Illuminate\Support\Collection;
use SkysoulDesign\Translation\Models\Group;
use SkysoulDesign\Translation\Models\Language;
use SkysoulDesign\Translation\Models\Translation;

/**
 * Class TranslationRepository
 *
 * @package SkysoulDesign\Translation\Repositories
 */
class TranslationRepository extends Repository implements TranslationRepositoryInterface
{

    /**
     * @var \SkysoulDesign\Translation\Models\Translation
     */
    public $model;

    /**
     * @var \SkysoulDesign\Translation\Models\Language
     */
    private $language;

    /**
     * @var Group
     */
    private $group;

    /**
     * @param Translation $translation
     * @param \SkysoulDesign\Translation\Models\Language $language
     * @param Group $group
     */
    function __construct(Translation $translation, Language $language, Group $group)
    {
        $this->model = $translation;
        $this->language = $language;
        $this->group = $group;
    }

    /**
     * Retrieve a list with all Languages
     *
     * @return Collection
     */
    public function languages()
    {
        return $this->language->all();
    }

    /**
     * Retrieve a Language by it's name
     *
     * @param string $name
     * @return \SkysoulDesign\Translation\Models\Language
     */
    public function language($name)
    {
        return $this->language->where(compact('name'))->firstOrFail();
    }

    /**
     * Retrieve a list with all Groups
     *
     * @return Collection
     */
    public function groups()
    {
        return $this->group->all();
    }

    /**
     * Retrieve a Group by it's name
     *
     * @param string $name
     * @return Group
     */
    public function group($name)
    {
        return $this->group->where(compact('name'))->firstOrFail();
    }


    /**
     * Create a new language
     *
     * @param string $name
     * @return \SkysoulDesign\Translation\Models\Language
     */
    public function createLanguage($name)
    {
        return $this->language->create(compact('name'));
    }

    /**
     * Create a new Group
     *
     * @param string $name
     * @return Group
     */
    public function createGroup($name)
    {
        return $this->group->create(compact('name'));
    }

    /**
     * Create a new Translation
     *
     * @param int $language_id
     * @param int $group_id
     * @param array $translation
     * @return \SkysoulDesign\Translation\Models\Language
     */
    public function createTranslation($language_id, $group_id, array $translation)
    {

        $translation = $this->model->create(array_merge($translation, compact('language_id')));

        /**
         * Attach Respective Language and Group to the Translation
         */
        $translation->groups()->attach($group_id);

        return $translation;

    }

    /**
     * Retrieve a list with all Translation with the specified Language/Group
     *
     * @param string $language_id
     * @param string $group_id
     * @return Collection
     */
    public function fetch($language_id, $group_id)
    {
        return $this->model
            ->whereHas('language', function ($query) use ($language_id) {
                $query->where("{$this->language->getTable()}.id", $language_id);
            })
            ->whereHas('groups', function ($query) use ($group_id) {
                $query->where("{$this->group->getTable()}.id", $group_id);
            })->get();
    }
}
