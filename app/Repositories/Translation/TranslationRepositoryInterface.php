<?php

namespace DreamsArk\Repositories\Translation;

use DreamsArk\Models\Translation\Group;
use DreamsArk\Models\Translation\Language;
use DreamsArk\Models\Translation\Translation;
use Illuminate\Support\Collection;

interface TranslationRepositoryInterface
{
    /**
     * Create a new User on the Database
     *
     * @param array $fields
     * @return Translation
     */
    public function create(array $fields);

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*']);

    /**
     * Update Model
     *
     * @param Int $id
     * @param array $fields
     * @return mixed|bool
     */
    public function update($id, array $fields);

    /**
     * Return all object within the where conditions
     * Best Usage with compact('value1', 'value2')
     *
     * @param $args
     * @return Collection|mixed
     */
    public function where($args);

    /**
     * Create a new language
     *
     * @param string $name
     * @return Language
     */
    public function createLanguage($name);

    /**
     * Create a new Translation
     *
     * @param int $language_id
     * @param int $group_id
     * @param array $translation
     * @return Language
     */
    public function createTranslation($language_id, $group_id, array $translation);

    /**
     * Create a new Group
     *
     * @param string $name
     * @return Group
     */
    public function createGroup($name);

    /**
     * Retrieve a Language by it's name
     *
     * @param string $name
     * @return Language
     */
    public function language($name);

    /**
     * Retrieve a list with all Languages
     *
     * @return Collection of Language
     */
    public function languages();

    /**
     * Retrieve a Group by it's name
     *
     * @param string $name
     * @return Group
     */
    public function group($name);

    /**
     * Retrieve a list with all Groups
     *
     * @return Collection of Group
     */
    public function groups();

    /**
     * Retrieve a list with all Translation with the specified Language/group
     *
     * @param string $language_id
     * @param string $group_id
     * @return Collection of Translation
     */
    public function fetch($language_id, $group_id);


}