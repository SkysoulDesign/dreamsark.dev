<?php

/**
 * Class SchemaTrait
 */
trait SchemaTrait
{

    /**
     * @var \Illuminate\Database\Schema\Builder
     */
    private $schema;

    /**
     * CreateRolesTable constructor.
     */
    public function __construct()
    {
        $this->schema = app(Illuminate\Database\Schema\Builder::class);
    }

}