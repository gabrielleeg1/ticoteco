/*
 * TikTok clone as web application
 * Copyright (C) 2022  Gabrielle Guimarães de Oliveira
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';

export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
    'http://localhost:8000/graphql';

export const AUTHORIZATION_KEY = 'Authorization';

const fetchGraphQL = (authorization: string) =>
  async (
      query: RequestParameters,
      variables: Variables,
  ): Promise<GraphQLResponse> => {
  // Fetch data from GitHub's GraphQL API:
    const response = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query: query.text, variables}),
    });

    // Get the response as JSON
    return await response.json();
  };

function buildRelayEnvironment(authorization: string): Environment {
  return new Environment({
    network: Network.create(fetchGraphQL(authorization)),
    store: new Store(new RecordSource()),
  });
}

export default buildRelayEnvironment;
