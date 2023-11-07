INSERT INTO
    "permissions" (id, "key", active)
VALUES
    (1, 'PERMISSIONS_CREATE', true),
    (2, 'PERMISSIONS_UPDATE', true),
    (3, 'PERMISSIONS_DELETE', true),
    (4, 'PERMISSIONS_READ', true),
    (5, 'ACCESS_GROUP_CREATE', true),
    (6, 'ACCESS_GROUP_UPDATE', true),
    (7, 'ACCESS_GROUP_DELETE', true),
    (8, 'ACCESS_GROUP_READ', true),
    (9, 'DEVELOP_ACCESS', true);

INSERT INTO
    "accessGroup" (id, "name", active, "createAt", "updateAt")
VALUES
    (
        1,
        'Desenvolvedores',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820'
    ),
    (
        2,
        'Administradores',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820'
    ),
    (
        3,
        'Gerente Comercial',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820'
    ),
    (
        4,
        'Atendimento',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820'
    );

INSERT INTO
    empresa (
        id,
        cnpj,
        "razaoSocial",
        "nomeFantasia",
        "ramoAtividade",
        "qtdFuncionarios",
        responsavel,
        telefone,
        email,
        active,
        "createAt",
        "updateAt"
    )
VALUES
    (
        1,
        '16679861000188',
        'E DI LAURO PAPELARIA E COMUNICACAO',
        'WOOHOO',
        'System',
        '1',
        'Eduardo Di Lauro',
        '11976150876',
        'eduardo.dilauro@gmail.com',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820'
    ),
    (
        2,
        '56870518000130',
        'HOW SIMPLE',
        'SIMPLE',
        'System',
        '1',
        'Eduardo Di Lauro',
        '11976150876',
        'eduardo.dilauro@gmail.com',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820'
    );

INSERT INTO
    users (
        id,
        "name",
        "empresaId",
        "accessGroupId",
        email,
        "password",
        active,
        "createAt",
        "updateAt",
        deleted
    )
VALUES
    (
        1,
        'Eduardo Di Lauro',
        1,
        1,
        'eduardo.dilauro@gmail.com',
        '2d57326c0020ca1b706370b2e80dc6d9',
        true,
        '2023-06-05 00:22:01.820',
        '2023-06-05 00:22:01.820',
        false
    );

INSERT INTO
    "accessGroupPermissions" (
        id,
        "accessGroupId",
        "permissionsId",
        "createAt",
        "updateAt"
    )
VALUES
    (
        1,
        1,
        9,
        '2023-06-09 21:46:29.863',
        '2023-06-09 21:46:29.863'
    ),
    (
        2,
        2,
        5,
        '2023-06-09 21:46:29.863',
        '2023-06-09 21:46:29.863'
    ),
    (
        3,
        2,
        6,
        '2023-06-09 21:46:29.863',
        '2023-06-09 21:46:29.863'
    ),
    (
        4,
        2,
        7,
        '2023-06-09 21:46:29.863',
        '2023-06-09 21:46:29.863'
    ),
    (
        5,
        2,
        8,
        '2023-06-09 21:46:29.863',
        '2023-06-09 21:46:29.863'
    );