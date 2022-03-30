insert into
    users (username, password, email)
values
    (
        'NadaAbuzaid',
        '$2b$10$Yc6PNtmbbefb.KLXRwMRZuN29m.bj0AwetT.pF3bKKrGaxXKRxpU6',
        'nada@gmail.com'
    );

insert into
    users (username, password, email)
values
    (
        'NadinAbuzaid',
        '$2b$10$Yc6PNtmbbefb.KLXRwMRZuN29m.bj0AwetT.pF3bKKrGaxXKRxpU6',
        'nadin@gmail.com'
    );

insert into
    posts (title, content, user_id)
values
    (
        'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut corporis at error commodi.Suscipit unde dolores neque animi pariatur eos,
        eligendi ipsa debitis enim veniam aperiam totam repellat officiis dolorum illum ea non optio ullam voluptas ! Expedita consequuntur nostrum nemo ! Architecto possimus assumenda error natus labore cupiditate,
        porro,accusantium nulla officia vitae necessitatibus,placeat',
        1
    );

insert into
    posts (title, content, user_id)
values
    (
        'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut corporis at error commodi.Suscipit unde dolores neque animi pariatur eos,
         eligendi ipsa debitis enim veniam aperiam totam repellat officiis dolorum illum ea non optio ullam voluptas ! Expedita consequuntur nostrum nemo ! Architecto possimus assumenda error natus labore cupiditate,
        porro,accusantium nulla officia vitae necessitatibus,placeat',
        2
    );

insert into
    posts (title, content, user_id)
values
    (
        'Lorem ipsum',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut corporis at error commodi.Suscipit unde dolores neque animi pariatur eos,
         eligendi ipsa debitis enim veniam aperiam totam repellat officiis dolorum illum ea non optio ullam voluptas ! Expedita consequuntur nostrum nemo ! Architecto possimus assumenda error natus labore cupiditate,
        porro,accusantium nulla officia vitae necessitatibus,placeat',
        1
    );

INSERT INTO
    votes (user_id, post_id, vote_type)
VALUES
    (1, 2, 'up');

insert into
    comments (user_id, post_id, content)
values
    (1, 1, 'This is a commentkk');

insert into
    comments (user_id, post_id, content)
values
    (2, 2, 'This is a commen55t');

insert into
    comments (user_id, post_id, content)
values
    (2, 3, 'This is a comm00ent');